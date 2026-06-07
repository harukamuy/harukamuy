/**
 * 人気記事ランキング生成スクリプト
 *   GA4 の「ページ別ページビュー（直近28日）」を取得し、
 *   記事ページ(/blog/<slug>)だけに絞って上位を data/popular-posts.json に保存する。
 *
 * 使い方: node scripts/popular-posts.js
 *   実行後、git で data/popular-posts.json をコミット＆push すると
 *   トップページの「人気記事」ランキングが更新されます。
 *   （月1回くらい実行すれば十分です）
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// ===== 設定 =====
const PROPERTY_ID = '534373958';
const CREDENTIALS_PATH = path.join(__dirname, '..', 'client_secret_148969337324-pllh9ott6eur49era10lqhr982car072.apps.googleusercontent.com.json');
const TOKEN_PATH = path.join(__dirname, '..', 'ga4-token.json');
const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
const OUT_PATH = path.join(__dirname, '..', 'data', 'popular-posts.json');
const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const TOP_N = 5;

// ===== 認証（保存済みトークンを使う。無ければ案内して終了）=====
async function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('ga4-token.json がありません。先に scripts/ga4-report.js を一度実行して認証してください。');
  }
  oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
  return oAuth2Client;
}

async function main() {
  const auth = await authorize();
  const analyticsData = google.analyticsdata({ version: 'v1beta', auth });

  const res = await analyticsData.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 100,
    },
  });

  // 実在する記事スラッグ
  const validSlugs = new Set(
    fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
  );

  const ranked = [];
  for (const row of res.data.rows || []) {
    const p = row.dimensionValues[0].value; // 例: /blog/xxx もしくは /blog/xxx/
    const m = p.match(/^\/blog\/([^/?#]+)\/?$/);
    if (!m) continue;                         // 記事ページ以外（トップ・一覧・タグ等）は除外
    const slug = m[1];
    if (!validSlugs.has(slug)) continue;      // 既に消えた記事は除外
    if (ranked.some((r) => r.slug === slug)) continue;
    ranked.push({ slug, pv: Number(row.metricValues[0].value) });
    if (ranked.length >= TOP_N) break;
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  const payload = {
    updated: new Date().toISOString().slice(0, 10),
    rangeDays: 28,
    posts: ranked,
  };
  fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + '\n');

  console.log(`✅ 人気記事 ${ranked.length} 件を ${path.relative(process.cwd(), OUT_PATH)} に保存しました`);
  ranked.forEach((r, i) => console.log(`  ${i + 1}位  ${String(r.pv).padStart(4)} PV  ${r.slug}`));
  console.log('\n→ git add data/popular-posts.json && git commit && git push で反映されます');
}

main().catch((err) => {
  if (err.message?.includes('invalid_grant')) {
    console.error('⚠️  認証トークンが切れています。ga4-token.json を削除し、scripts/ga4-report.js で再認証してください。');
  } else {
    console.error('エラー:', err.message);
  }
  process.exit(1);
});
