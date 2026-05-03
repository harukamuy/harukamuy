/**
 * Google Indexing API 一括送信スクリプト
 *
 * 使い方:
 *   node scripts/index-request.js               # sitemap.xml の全URL を送信
 *   node scripts/index-request.js --new-only   # ここ7日以内に追加された記事のみ
 *   node scripts/index-request.js URL1 URL2     # 個別URL指定
 *
 * 前提:
 *   - Google Cloud で Service Account 作成済み
 *   - Indexing API 有効化済み
 *   - Search Console で Service Account を「所有者」として追加済み
 *   - サービスアカウントの鍵ファイルを harukamuy-indexing-key.json として配置
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// ===== 設定 =====
const KEY_PATH = path.join(__dirname, '..', 'harukamuy-indexing-key.json');
const SITE_URL = 'https://harukamuy.com';
const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

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

// ===== 認証 =====
async function authorize() {
  if (!fs.existsSync(KEY_PATH)) {
    console.error(`\n❌ サービスアカウントの鍵ファイルが見つかりません:\n   ${KEY_PATH}\n`);
    console.error('   セットアップ手順:');
    console.error('   1. Google Cloud Console で Service Account 作成');
    console.error('   2. JSON キーをダウンロード');
    console.error(`   3. ${KEY_PATH} に配置`);
    console.error('   4. Search Console でサービスアカウントを「所有者」として追加\n');
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: SCOPES,
  });
  return auth.getClient();
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

  const client = await authorize();

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
