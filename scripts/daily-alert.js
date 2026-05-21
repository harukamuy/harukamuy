/**
 * 日次アクセス急増アラート
 * 使い方: node scripts/daily-alert.js
 * 昨日のPVが直近7日間の日次平均の2倍以上の記事を通知する
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// ===== 設定 =====
const PROPERTY_ID = '534373958';
const CREDENTIALS_PATH = path.join(__dirname, '..', 'client_secret_148969337324-pllh9ott6eur49era10lqhr982car072.apps.googleusercontent.com.json');
const TOKEN_PATH = path.join(__dirname, '..', 'ga4-token.json');
const SPIKE_THRESHOLD = 2.0;   // 平均の何倍以上でアラートを出すか
const MIN_PV_YESTERDAY = 10;   // 昨日のPVがこれ未満なら無視（ノイズ除去）

// ===== 認証 =====
async function authorize() {
  if (!fs.existsSync(TOKEN_PATH)) {
    console.log('⚠️  ga4-token.json がありません。先に node scripts/ga4-report.js を実行して認証してください。');
    process.exit(1);
  }
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

// ===== データ取得 =====
async function fetchData(auth) {
  const analyticsData = google.analyticsdata({ version: 'v1beta', auth });

  // 昨日のページ別PV
  const resYesterday = await analyticsData.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: '1daysAgo', endDate: '1daysAgo' }],
      dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 20,
    },
  });

  // 直近7日間（昨日を除く）のページ別PV
  const res7days = await analyticsData.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: '8daysAgo', endDate: '2daysAgo' }],
      dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 50,
    },
  });

  // サイト全体サマリー（昨日 vs 直近7日平均）
  const resTotalYesterday = await analyticsData.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: '1daysAgo', endDate: '1daysAgo' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }, { name: 'activeUsers' }],
    },
  });

  const resTotal7days = await analyticsData.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: '8daysAgo', endDate: '2daysAgo' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }, { name: 'activeUsers' }],
    },
  });

  return { resYesterday, res7days, resTotalYesterday, resTotal7days };
}

// ===== レポート表示 =====
function printAlert({ resYesterday, res7days, resTotalYesterday, resTotal7days }) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' });

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔔 harukamuy.com 日次アクセスチェック');
  console.log(`   対象日: ${dateStr}`);
  console.log(`   生成日時: ${new Date().toLocaleString('ja-JP')}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // ── サイト全体 ──
  const tvYes = resTotalYesterday.data.rows?.[0]?.metricValues || [];
  const tv7   = resTotal7days.data.rows?.[0]?.metricValues    || [];
  const totalPV_yes  = Number(tvYes[0]?.value || 0);
  const totalPV_7    = Number(tv7[0]?.value   || 0);
  const dailyAvg     = Math.round(totalPV_7 / 7);
  const totalRatio   = dailyAvg > 0 ? (totalPV_yes / dailyAvg) : 0;
  const totalArrow   = totalRatio >= SPIKE_THRESHOLD ? '🔥' : totalRatio >= 1.5 ? '📈' : totalRatio >= 0.8 ? '  ' : '📉';

  console.log('\n【サイト全体】');
  console.log(`  昨日のPV    : ${totalPV_yes.toLocaleString()} PV`);
  console.log(`  7日間日次平均: ${dailyAvg.toLocaleString()} PV`);
  console.log(`  昨日 / 平均 : ${totalArrow} ${totalRatio.toFixed(1)}倍`);

  // ── ページ別急増チェック ──
  // 7日間データをページごとにマップ化
  const avg7Map = {};
  (res7days.data.rows || []).forEach(row => {
    const path = row.dimensionValues[1].value;
    avg7Map[path] = Math.round(Number(row.metricValues[0].value) / 7);
  });

  const yesterdayRows = resYesterday.data.rows || [];
  const spikes = [];
  const normal = [];

  yesterdayRows.forEach(row => {
    const title  = row.dimensionValues[0].value.replace(' | harukamuy', '').replace(' | はるかむい', '');
    const path   = row.dimensionValues[1].value;
    const pvYes  = Number(row.metricValues[0].value);
    const pvAvg  = avg7Map[path] || 0;
    const ratio  = pvAvg > 0 ? pvYes / pvAvg : pvYes > 0 ? 99 : 0;

    if (pvYes >= MIN_PV_YESTERDAY) {
      if (ratio >= SPIKE_THRESHOLD) {
        spikes.push({ title, path, pvYes, pvAvg, ratio });
      } else {
        normal.push({ title, path, pvYes, pvAvg, ratio });
      }
    }
  });

  // ── 急増記事 ──
  if (spikes.length > 0) {
    console.log('\n【🔥 急増記事（平均の2倍以上）】');
    spikes.sort((a, b) => b.ratio - a.ratio).forEach(item => {
      const ratio = item.pvAvg > 0
        ? `平均${item.pvAvg}PV → ${item.pvYes}PV（${item.ratio.toFixed(1)}倍）`
        : `${item.pvYes}PV（新規流入）`;
      console.log(`  🔥 ${item.title}`);
      console.log(`       ${ratio}`);
    });
    console.log('');
    console.log('  💡 アクションヒント：');
    console.log('     ・急増記事に関連する他記事への内部リンクを追加する');
    console.log('     ・SNSでシェアして勢いを伸ばす');
  } else {
    console.log('\n【急増記事】特になし（通常どおり）');
  }

  // ── 昨日のPV上位記事 ──
  if (normal.length > 0 || spikes.length > 0) {
    console.log('\n【昨日のアクセス上位記事】');
    const all = [...spikes, ...normal].sort((a, b) => b.pvYes - a.pvYes).slice(0, 8);
    all.forEach((item, i) => {
      const mark = item.ratio >= SPIKE_THRESHOLD ? '🔥' : item.ratio >= 1.5 ? '📈' : '  ';
      console.log(`  ${String(i+1).padStart(2)}位  ${String(item.pvYes).padStart(4)} PV  ${mark}  ${item.title}`);
    });
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// ===== メイン =====
(async () => {
  try {
    const auth = await authorize();
    const data = await fetchData(auth);
    printAlert(data);
  } catch (err) {
    if (err.message?.includes('invalid_grant')) {
      console.log('⚠️  認証トークンが切れています。ga4-token.json を削除して node scripts/ga4-report.js を実行してください。');
    } else {
      console.error('エラー:', err.message);
    }
  }
})();
