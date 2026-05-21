/**
 * Search Console レポート スクリプト
 * 使い方: node scripts/search-console-report.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ===== 設定 =====
const SITE_URL = 'https://harukamuy.com/';
const CREDENTIALS_PATH = path.join(__dirname, '..', 'client_secret_148969337324-pllh9ott6eur49era10lqhr982car072.apps.googleusercontent.com.json');
const TOKEN_PATH = path.join(__dirname, '..', 'gsc-token.json');
const RANK_HISTORY_PATH = path.join(__dirname, '..', 'data', 'rank-history.json');
const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

// ===== 認証 =====
async function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  return getNewToken(oAuth2Client);
}

async function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
  console.log('\n🔐 以下のURLをブラウザで開いてください:\n');
  console.log(authUrl);
  console.log('');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const code = await new Promise(resolve => {
    rl.question('認証後に表示されたコードを貼り付けてください: ', answer => {
      rl.close();
      resolve(answer);
    });
  });

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  console.log('✅ 認証情報を保存しました\n');
  return oAuth2Client;
}

// ===== データ取得 =====
async function runReport(auth) {
  const webmasters = google.webmasters({ version: 'v3', auth });

  const today = new Date();
  const endDate = today.toISOString().split('T')[0];
  const startDate28 = new Date(today - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const startDate7  = new Date(today - 7  * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const startDate56 = new Date(today - 56 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const endDate28   = new Date(today - 29 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // 過去7日間：サマリー
  const resSummary7 = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: { startDate: startDate7, endDate, dimensions: [], rowLimit: 1 },
  });

  // 過去28日間：サマリー（今期）
  const resSummary28 = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: { startDate: startDate28, endDate, dimensions: [], rowLimit: 1 },
  });

  // 過去29〜56日間：サマリー（前期・比較用）
  const resSummaryPrev = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: { startDate: startDate56, endDate: endDate28, dimensions: [], rowLimit: 1 },
  });

  // 過去28日間：キーワード（上位50件）
  const resKeywords = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: startDate28,
      endDate,
      dimensions: ['query'],
      rowLimit: 50,
      orderBy: [{ fieldName: 'impressions', sortOrder: 'DESCENDING' }],
    },
  });

  // 過去28日間：ページ別パフォーマンス
  const resPages = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: startDate28,
      endDate,
      dimensions: ['page'],
      rowLimit: 15,
      orderBy: [{ fieldName: 'clicks', sortOrder: 'DESCENDING' }],
    },
  });

  return { resSummary7, resSummary28, resSummaryPrev, resKeywords, resPages };
}

// ===== 伸びしろスコア計算 =====
// 表示回数が多く、順位が10〜30位で、CTRが低いほど「伸びしろ大」
function calcOpportunityScore(row) {
  const imp = row.impressions || 0;
  const pos = row.position || 99;
  const ctr = row.ctr || 0;

  // 順位が8〜25位の範囲に高いスコアを付ける（圏外や1位は対象外）
  const posScore = pos >= 8 && pos <= 25 ? (25 - pos) / 17 : 0;
  // CTRが低いほど改善余地あり
  const ctrScore = Math.max(0, 1 - ctr * 10);
  // 表示回数は対数スケール
  const impScore = Math.log10(Math.max(imp, 1)) / 3;

  return Math.round((posScore * 0.5 + ctrScore * 0.3 + impScore * 0.2) * 100);
}

// ===== 前月比の矢印表示 =====
function trend(current, previous) {
  if (!previous || previous === 0) return '  —';
  const rate = ((current - previous) / previous) * 100;
  const arrow = rate >= 0 ? '↑' : '↓';
  return `${arrow}${Math.abs(rate).toFixed(0)}%`;
}

// ===== レポート表示 =====
function printReport({ resSummary7, resSummary28, resSummaryPrev, resKeywords, resPages }, rankChanges = {}) {
  const s7    = resSummary7.data.rows?.[0]    || {};
  const s28   = resSummary28.data.rows?.[0]   || {};
  const sPrev = resSummaryPrev.data.rows?.[0] || {};

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔍 harukamuy.com Search Console レポート');
  console.log(`   生成日時: ${new Date().toLocaleString('ja-JP')}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // ── サマリー ──
  console.log('\n【サマリー】');
  console.log('                   過去7日   直近28日  前28日  前月比');
  console.log(`  クリック数   : ${String(Math.round(s7.clicks||0)).padStart(7)}  ${String(Math.round(s28.clicks||0)).padStart(7)}  ${String(Math.round(sPrev.clicks||0)).padStart(6)}  ${trend(s28.clicks||0, sPrev.clicks||0)}`);
  console.log(`  表示回数     : ${String(Math.round(s7.impressions||0)).padStart(7)}  ${String(Math.round(s28.impressions||0)).padStart(7)}  ${String(Math.round(sPrev.impressions||0)).padStart(6)}  ${trend(s28.impressions||0, sPrev.impressions||0)}`);
  console.log(`  平均CTR      : ${String(((s7.ctr||0)*100).toFixed(1)+'%').padStart(7)}  ${String(((s28.ctr||0)*100).toFixed(1)+'%').padStart(7)}  ${String(((sPrev.ctr||0)*100).toFixed(1)+'%').padStart(6)}`);
  console.log(`  平均掲載順位 : ${String((s7.position||0).toFixed(1)).padStart(7)}  ${String((s28.position||0).toFixed(1)).padStart(7)}  ${String((sPrev.position||0).toFixed(1)).padStart(6)}`);

  const allKeywords = resKeywords.data.rows || [];

  // ── キーワード TOP20（表示回数順）──
  const top20 = allKeywords.slice(0, 20);
  const hasChanges = Object.keys(rankChanges).length > 0;
  console.log('\n【検索キーワード TOP20（過去28日・表示回数順）】');
  console.log(hasChanges
    ? '  　　　　表示   クリック  CTR    順位    先週比  キーワード'
    : '  　　　　表示   クリック  CTR    順位  キーワード');
  top20.forEach((row, i) => {
    const impressions = String(Math.round(row.impressions)).padStart(6);
    const clicks      = String(Math.round(row.clicks)).padStart(5);
    const ctr         = ((row.ctr||0)*100).toFixed(1).padStart(5) + '%';
    const pos         = (row.position||0).toFixed(1).padStart(5);
    const kw          = row.keys[0];
    let changeStr = '';
    if (hasChanges) {
      const ch = rankChanges[kw];
      if (ch) {
        const arrow = ch.diff > 0 ? '↑' : '↓';
        const color = ch.diff > 0 ? '▲' : '▼';
        changeStr = `  ${arrow}${Math.abs(ch.diff).toFixed(1)}`;
      } else {
        changeStr = '      ';
      }
    }
    console.log(`  ${String(i+1).padStart(2)}位  ${impressions}  ${clicks}  ${ctr}  ${pos}位${changeStr}  ${kw}`);
  });

  // ── 伸びしろスコアランキング ──
  const scored = allKeywords
    .map(row => ({ ...row, score: calcOpportunityScore(row) }))
    .filter(row => row.score >= 20 && row.impressions >= 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  if (scored.length > 0) {
    console.log('\n【🎯 伸びしろスコア TOP10（強化すると効果が大きい記事・キーワード）】');
    console.log('  スコア  表示   クリック  CTR    順位  キーワード');
    scored.forEach(row => {
      const score       = String(row.score).padStart(5);
      const impressions = String(Math.round(row.impressions)).padStart(6);
      const clicks      = String(Math.round(row.clicks)).padStart(5);
      const ctr         = ((row.ctr||0)*100).toFixed(1).padStart(5) + '%';
      const pos         = (row.position||0).toFixed(1).padStart(5);
      console.log(`   ${score}  ${impressions}  ${clicks}  ${ctr}  ${pos}位  ${row.keys[0]}`);
    });
    console.log('\n  ※ スコアが高いほど「検索には表示されているのにクリックされていない」状態。');
    console.log('     タイトル・見出しを改善すると流入アップが見込めます。');
  }

  // ── 書くべき記事の提案 ──
  // 順位が低い（20位以下）＆表示回数がある＝記事が弱いか存在しない可能性
  const articleIdeas = allKeywords
    .filter(row => row.position >= 20 && row.impressions >= 10 && row.clicks <= 2)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 8);

  if (articleIdeas.length > 0) {
    console.log('\n【✍️  書くべき記事のヒント（検索需要はあるが記事が弱いキーワード）】');
    console.log('  　　　　表示   クリック  順位   キーワード');
    articleIdeas.forEach((row, i) => {
      const impressions = String(Math.round(row.impressions)).padStart(6);
      const clicks      = String(Math.round(row.clicks)).padStart(5);
      const pos         = (row.position||0).toFixed(1).padStart(6);
      console.log(`  ${String(i+1).padStart(2)}位  ${impressions}  ${clicks}  ${pos}位  ${row.keys[0]}`);
    });
    console.log('\n  ※ Googleが「このサイトに関係ある」と判断しているが、まだ記事が薄いか未作成のキーワード。');
    console.log('     専用記事を書くと大幅に順位が上がる可能性があります。');
  }

  // ── ページ別クリック TOP ──
  console.log('\n【ページ別クリック数 TOP10（過去28日）】');
  const pages = resPages.data.rows || [];
  pages.slice(0, 10).forEach((row, i) => {
    const clicks = String(Math.round(row.clicks)).padStart(5);
    const pos    = (row.position||0).toFixed(1).padStart(5);
    const page   = row.keys[0].replace('https://harukamuy.com', '') || '/';
    console.log(`  ${String(i+1).padStart(2)}位  ${clicks}クリック  ${pos}位  ${page}`);
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// ===== 順位履歴の保存・読み込み =====
function loadRankHistory() {
  try {
    if (fs.existsSync(RANK_HISTORY_PATH)) {
      return JSON.parse(fs.readFileSync(RANK_HISTORY_PATH, 'utf-8'));
    }
  } catch (e) {}
  return [];
}

function saveRankHistory(keywords) {
  const dir = path.dirname(RANK_HISTORY_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const history = loadRankHistory();
  const today = new Date().toISOString().split('T')[0];

  // 同じ日付のスナップショットがあれば上書き
  const idx = history.findIndex(h => h.date === today);
  const snapshot = {
    date: today,
    keywords: Object.fromEntries(
      keywords.map(row => [row.keys[0], {
        position: Math.round(row.position * 10) / 10,
        clicks: Math.round(row.clicks),
        impressions: Math.round(row.impressions),
      }])
    ),
  };

  if (idx >= 0) {
    history[idx] = snapshot;
  } else {
    history.push(snapshot);
  }

  // 直近13週分（約3ヶ月）だけ保持
  const recent = history.slice(-13);
  fs.writeFileSync(RANK_HISTORY_PATH, JSON.stringify(recent, null, 2));
}

function getRankChanges(currentKeywords, history) {
  if (history.length < 2) return {};
  // 1週間前に最も近いスナップショットを探す
  const today = new Date();
  const oneWeekAgo = new Date(today - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const prevSnapshot = history
    .filter(h => h.date <= oneWeekAgo)
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  if (!prevSnapshot) return {};

  const changes = {};
  currentKeywords.forEach(row => {
    const kw = row.keys[0];
    const prev = prevSnapshot.keywords?.[kw];
    if (prev) {
      const diff = prev.position - row.position; // 正なら順位UP（数値が小さいほど上位）
      if (Math.abs(diff) >= 0.5) {
        changes[kw] = { diff: Math.round(diff * 10) / 10, prevPos: prev.position };
      }
    }
  });
  return changes;
}

// ===== メイン =====
(async () => {
  try {
    const auth = await authorize();
    const data = await runReport(auth);

    // 順位履歴を読み込んで先週比を計算
    const history = loadRankHistory();
    const allKeywords = data.resKeywords.data.rows || [];
    const rankChanges = getRankChanges(allKeywords, history);

    // 今週のデータを保存
    saveRankHistory(allKeywords);

    printReport(data, rankChanges);
  } catch (err) {
    if (err.message?.includes('invalid_grant')) {
      console.log('⚠️  認証トークンが切れています。gsc-token.json を削除して再実行してください。');
    } else {
      console.error('エラー:', err.message);
    }
  }
})();
