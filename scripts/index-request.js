/**
 * Google Indexing API 一括送信スクリプト
 *
 * 使い方:
 *   node scripts/index-request.js               # sitemap.xml の全URL を送信
 *   node scripts/index-request.js --new-only   # ここ7日以内に追加された記事のみ
 *   node scripts/index-request.js URL1 URL2     # 個別URL指定
 *
 * 認証: OAuth2（ブラウザでGoogleログイン）
 *   初回実行時にブラウザが開きます。bokushinya@gmail.com でログインして許可してください。
 *   トークンは indexing-token.json に保存され、次回から自動ログインになります。
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const http = require('http');

// ===== 設定 =====
const CREDENTIALS_PATH = path.join(__dirname, '..', 'client_secret_148969337324-pllh9ott6eur49era10lqhr982car072.apps.googleusercontent.com.json');
const TOKEN_PATH = path.join(__dirname, '..', 'indexing-token.json');
const SITE_URL = 'https://harukamuy.com';
const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

// ===== OAuth 認証 =====
async function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3333');

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  // 初回：ブラウザで認証
  const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
  console.log('\n🔐 ブラウザでGoogleにログインして許可してください...\n');

  // ローカルサーバーでコードを受け取る
  const code = await new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url, 'http://localhost:3333');
      const code = url.searchParams.get('code');
      if (!code) { res.end('waiting'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>✅ 認証成功！このタブを閉じてください。</h1>');
      server.close();
      resolve(code);
    });
    server.listen(3333, () => {
      // ブラウザを自動で開く
      const { exec } = require('child_process');
      exec(`open "${authUrl}"`);
    });
    setTimeout(() => reject(new Error('認証タイムアウト（120秒）')), 120000);
  });

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  console.log('✅ 認証情報を保存しました（次回から自動ログイン）\n');
  return oAuth2Client;
}

// ===== URL 一覧の取得 =====
function getAllPostUrls() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  return files.map((f) => {
    const slug = f.replace(/\.md$/, '');
    return `${SITE_URL}/blog/${slug}`;
  });
}

function getRecentPostUrls(daysBack = 7) {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysBack);

  return files
    .map((f) => {
      const fullPath = path.join(POSTS_DIR, f);
      const stat = fs.statSync(fullPath);
      const slug = f.replace(/\.md$/, '');
      return {
        url: `${SITE_URL}/blog/${slug}`,
        mtime: stat.mtime,
      };
    })
    .filter((entry) => entry.mtime >= cutoff)
    .map((entry) => entry.url);
}

function getStaticPageUrls() {
  return [
    `${SITE_URL}/`,
    `${SITE_URL}/about`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/sidefire`,
    `${SITE_URL}/gomamochi`,
  ];
}


// ===== インデックス送信 =====
async function publishUrl(client, url) {
  const indexing = google.indexing({ version: 'v3', auth: client });
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: 'URL_UPDATED',
      },
    });
    return { ok: true, url, time: res.data.urlNotificationMetadata?.latestUpdate?.notifyTime };
  } catch (err) {
    return { ok: false, url, error: err.message };
  }
}

// ===== メイン =====
async function main() {
  const args = process.argv.slice(2);

  let urls;
  if (args.length > 0 && args[0] === '--new-only') {
    urls = getRecentPostUrls(7);
    console.log(`📅 直近7日以内に更新された記事: ${urls.length}件`);
  } else if (args.length > 0 && args[0].startsWith('http')) {
    urls = args;
    console.log(`📝 指定された ${urls.length} 件のURLを送信`);
  } else {
    urls = [...getStaticPageUrls(), ...getAllPostUrls()];
    console.log(`📚 全ページ: ${urls.length}件 (固定ページ + ブログ記事)`);
  }

  if (urls.length === 0) {
    console.log('送信対象のURLがありません。');
    return;
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 Google Indexing API への送信開始');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const oAuth2Client = await authorize();
  const client = oAuth2Client;

  let success = 0;
  let failure = 0;
  const failed = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(`[${i + 1}/${urls.length}] ${url} ... `);
    const result = await publishUrl(client, url);
    if (result.ok) {
      console.log('✅');
      success++;
    } else {
      console.log(`❌ ${result.error}`);
      failure++;
      failed.push(result);
    }
    // API レート制限対策: 200ms 間隔
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ 成功: ${success} 件`);
  if (failure > 0) {
    console.log(`❌ 失敗: ${failure} 件`);
    failed.forEach((f) => console.log(`   - ${f.url}: ${f.error}`));
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📊 反映確認: https://search.google.com/search-console');
  console.log('   インデックス登録には数時間〜数日かかります。\n');
}

main().catch((err) => {
  console.error('\n💥 エラー:', err.message);
  process.exit(1);
});
