/**
 * GA4 アクセスレポート スクリプト
 * 使い方: node scripts/ga4-report.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ===== 設定 =====
const PROPERTY_ID = '534373958';
const CREDENTIALS_PATH = path.join(__dirname, '..', 'client_secret_148969337324-pllh9ott6eur49era10lqhr982car072.apps.googleusercontent.com.json');
const TOKEN_PATH = path.join(__dirname, '..', 'ga4-token.json');
const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];

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
  console.log('✅ 認証情報を保存しました（次回から自動ログイン）\n');
  return oAuth2Client;
}

// ===== GA4 データ取得 =====
async function runReport(auth) {
  const analyticsData = google.analyticsdata({ version: 'v1beta', auth });

  // 過去7日間
  const res7 = await analyticsData.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'activeUsers' },
      ],
    },
  });

  // 過去30日間
  const res30 = await analyticsData.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'activeUsers' },
      ],
    },
  });

  // 人気記事TOP10（過去30日）
  const resPages = await analyticsData.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 10,
    },
  });

  // 流入元（過去30日）
  const resSource = await analyticsData.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 6,
    },
  });

  return { res7, res30, resPages, resSource };
}

// ===== レポート表示 =====
function printReport({ res7, res30, resPages, resSource }) {
  const v7 = res7.data.rows?.[0]?.metricValues || [];
  const v30 = res30.data.rows?.[0]?.metricValues || [];

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 harukamuy.com アクセスレポート');
  console.log(`   生成日時: ${new Date().toLocaleString('ja-JP')}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  console.log('\n【過去7日間】');
  console.log(`  ページビュー : ${Number(v7[0]?.value || 0).toLocaleString()} PV`);
  console.log(`  セッション   : ${Number(v7[1]?.value || 0).toLocaleString()}`);
  console.log(`  ユーザー数   : ${Number(v7[2]?.value || 0).toLocaleString()} 人`);

  console.log('\n【過去30日間】');
  console.log(`  ページビュー : ${Number(v30[0]?.value || 0).toLocaleString()} PV`);
  console.log(`  セッション   : ${Number(v30[1]?.value || 0).toLocaleString()}`);
  console.log(`  ユーザー数   : ${Number(v30[2]?.value || 0).toLocaleString()} 人`);

  console.log('\n【人気記事 TOP10（過去30日）】');
  const pages = resPages.data.rows || [];
  pages.forEach((row, i) => {
    const title = row.dimensionValues[0].value.replace(' | harukamuy', '').replace(' | はるかむい', '');
    const pv = Number(row.metricValues[0].value).toLocaleString();
    console.log(`  ${String(i + 1).padStart(2)}位  ${pv.padStart(5)} PV  ${title}`);
  });

  console.log('\n【流入元（過去30日）】');
  const sources = resSource.data.rows || [];
  sources.forEach(row => {
    const src = row.dimensionValues[0].value;
    const sessions = Number(row.metricValues[0].value).toLocaleString();
    console.log(`  ${sessions.padStart(5)} セッション  ${src}`);
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// ===== メイン =====
(async () => {
  try {
    const auth = await authorize();
    const data = await runReport(auth);
    printReport(data);
  } catch (err) {
    if (err.message?.includes('invalid_grant')) {
      console.log('⚠️  認証トークンが切れています。ga4-token.json を削除して再実行してください。');
    } else {
      console.error('エラー:', err.message);
    }
  }
})();
