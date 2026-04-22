import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "harukamuy のプライバシーポリシーです。",
};

const sections = [
  {
    title: "1. 個人情報の取り扱いについて",
    body: "当ブログ「harukamuy」（以下、当サイト）では、お問い合わせの際にお名前・メールアドレスをご入力いただく場合があります。取得した個人情報は、お問い合わせへの返信のみに使用し、第三者への提供は行いません。",
  },
  {
    title: "2. アクセス解析ツールについて",
    body: "当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用する場合があります。Googleアナリティクスはデータの収集のためにCookieを使用します。このデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否できます。詳細はGoogleアナリティクスサービス利用規約およびGoogleプライバシーポリシーをご覧ください。",
  },
  {
    title: "3. 広告について",
    body: "当サイトでは、第三者配信の広告サービス（Amazonアソシエイト、その他アフィリエイトプログラム）を利用する場合があります。広告配信事業者はCookieを使用してユーザーのサイト訪問情報をもとに広告を配信する場合があります。Cookieの使用は各広告配信事業者のプライバシーポリシーに基づきます。",
  },
  {
    title: "4. Amazonアソシエイトについて",
    body: "当サイトはAmazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。",
  },
  {
    title: "5. Cookieについて",
    body: "当サイトでは、一部のコンテンツにおいてCookieを使用しています。CookieはWebブラウザに保存される小さなテキストファイルで、ユーザーの利便性向上のために使用されます。ブラウザの設定によりCookieを無効にすることが可能ですが、一部のコンテンツが正しく表示されない場合があります。",
  },
  {
    title: "6. 免責事項",
    body: "当サイトのコンテンツ・情報は、できる限り正確な情報を掲載するよう努めておりますが、正確性・安全性を保証するものではありません。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。また、当サイトの投資に関する情報は個人の見解であり、特定の投資を推奨・勧誘するものではありません。投資は自己責任でお願いいたします。",
  },
  {
    title: "7. 著作権について",
    body: "当サイトに掲載しているテキスト・画像等の著作権は、運営者に帰属します。無断転載・複製はご遠慮ください。引用の際は出典を明記してください。",
  },
  {
    title: "8. プライバシーポリシーの変更",
    body: "当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載した時点から効力を生じるものとします。",
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* HERO */}
      <div style={{
        background: "var(--ivory-2)",
        borderBottom: "1px solid var(--beige)",
        padding: "56px 24px 44px",
        textAlign: "center",
      }}>
        <div style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--brown-3)", marginBottom: 10 }}>
          Legal
        </div>
        <h1 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 700, color: "var(--brown)", lineHeight: 1.5 }}>
          プライバシーポリシー
        </h1>
        <p style={{ fontSize: 13, color: "var(--brown-3)", marginTop: 10 }}>
          最終更新日：2026年4月21日
        </p>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* intro */}
        <div style={{
          background: "var(--white)",
          border: "1.5px solid var(--beige)",
          borderRadius: 16,
          padding: "20px 24px",
          fontSize: 13,
          color: "var(--brown-2)",
          lineHeight: 1.9,
          marginBottom: 40,
        }}>
          harukamuy（以下、当サイト）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本ポリシーは、当サイトにおける個人情報の取り扱いについて説明するものです。
        </div>

        {/* sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {sections.map((s) => (
            <div key={s.title}>
              <h2 style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--brown)",
                marginBottom: 10,
                paddingLeft: 12,
                borderLeft: "3px solid var(--terra)",
                lineHeight: 1.6,
              }}>
                {s.title}
              </h2>
              <p style={{
                fontSize: 13,
                color: "var(--brown-2)",
                lineHeight: 1.95,
                paddingLeft: 4,
              }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* contact */}
        <div style={{
          background: "var(--ivory-2)",
          border: "1.5px solid var(--beige-2)",
          borderRadius: 16,
          padding: "24px",
          marginTop: 48,
          fontSize: 13,
          color: "var(--brown-2)",
          lineHeight: 1.9,
        }}>
          <div style={{ fontWeight: 700, color: "var(--brown)", marginBottom: 8 }}>お問い合わせ</div>
          プライバシーポリシーに関するご質問は、下記メールアドレスまでご連絡ください。<br />
          <a href="mailto:mio@harukamuy.com" style={{ color: "var(--terra)", textDecoration: "none", fontWeight: 500 }}>
            mio@harukamuy.com
          </a>
        </div>

      </div>
    </>
  );
}
