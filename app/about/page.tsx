import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "澪とごまもちについて",
  description: "白川澪（34歳・フリーランス映像プロデューサー）とボストンテリアのごまもちのプロフィール。",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">About</h1>
      <p className="text-stone-500 mb-10">澪とごまもちについて</p>

      {/* 澪 */}
      <section className="bg-white rounded-2xl border border-stone-200 p-8 mb-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-3xl">
            👩
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-800">白川 澪（しらかわ みお）</h2>
            <p className="text-sm text-stone-400">34歳・フリーランス映像プロデューサー・東京在住</p>
          </div>
        </div>
        <div className="space-y-3 text-stone-600 text-sm leading-relaxed">
          <p>
            2023年3月、10年以上勤めた映像制作会社を退職。資産3,500万円を貯めてからフリーランスに転身。
            現在は映像プロデューサーとして月40〜70万円の収入を得ながら、サイドFIREを実践中。
          </p>
          <p>
            2010年頃からFIREを意識し始め、コツコツと資産を積み上げてきた。
            2026年4月時点での総資産は約5,463万円。目標の5,000万円を超えたが、
            仕事が好きなので無理なく続けていく方針。
          </p>
          <div className="bg-amber-50 rounded-xl p-4 mt-4">
            <p className="font-semibold text-amber-700 mb-2 text-xs">📊 現在のポートフォリオ</p>
            <div className="grid grid-cols-2 gap-y-1 text-xs text-stone-600">
              <span>総資産</span><span className="font-semibold">約5,463万円</span>
              <span>S&P500（投信＋iDeCo）</span><span>3,582万円（64.8%）</span>
              <span>高配当株＋外国債券ETF</span><span>1,461万円（25.8%）</span>
              <span>ビットコイン</span><span>120万円（2.1%）</span>
              <span>現金</span><span>300万円（5.3%）</span>
              <span>年間配当金（税引後）</span><span className="text-emerald-600 font-semibold">約49万円</span>
            </div>
          </div>
        </div>
      </section>

      {/* ごまもち */}
      <section className="bg-white rounded-2xl border border-stone-200 p-8 mb-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl">
            🐾
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-800">ごまもち</h2>
            <p className="text-sm text-stone-400">ボストンテリア・澪の相棒</p>
          </div>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed">
          白黒のスーツを着たような柄が特徴のボストンテリア。明るくてツッコミが得意。
          澪のFIRE計画を一番そばで見守っている。口座は持てないが、ごはん代は最優先で確保されている。
        </p>
      </section>

      {/* このブログについて */}
      <section className="bg-white rounded-2xl border border-stone-200 p-8">
        <h2 className="text-lg font-bold text-stone-800 mb-3">このブログについて</h2>
        <p className="text-stone-600 text-sm leading-relaxed">
          澪とごまもちの会話形式で、サイドFIREの実録を毎月公開するブログです。
          資産の増減も正直に記録します。同じようにFIREを目指している方と、
          一緒に考えていける場所にしたいと思っています。
        </p>
      </section>
    </div>
  );
}
