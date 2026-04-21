import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-10">About</h1>

      <section className="bg-white rounded-2xl border border-stone-200 p-8 mb-6">
        <div className="text-5xl mb-4">🐾</div>
        <h2 className="text-xl font-bold text-stone-800 mb-3">ごまもち</h2>
        <p className="text-stone-600 leading-relaxed">
          ボストンテリアのごまもちです。白黒のスーツを着たような柄が特徴で、毎日元気いっぱい。
          このブログでは、ごまもちとの日常や、愛犬と暮らす上で役立つ情報をお届けします。
        </p>
      </section>

      <section className="bg-white rounded-2xl border border-stone-200 p-8 mb-6">
        <div className="text-5xl mb-4">💰</div>
        <h2 className="text-xl font-bold text-stone-800 mb-3">澪のサイドFIRE</h2>
        <p className="text-stone-600 leading-relaxed">
          会社員をしながら、サイドFIRE（経済的自立+副業収入）を目指しています。
          投資・副業・節約の実録を、失敗も含めて正直に書いていきます。
        </p>
      </section>

      <section className="bg-white rounded-2xl border border-stone-200 p-8">
        <h2 className="text-xl font-bold text-stone-800 mb-3">このブログについて</h2>
        <p className="text-stone-600 leading-relaxed">
          harukamuy（ハルカムイ）は、ごまもちとの暮らしと、澪のサイドFIREへの挑戦を記録するブログです。
          アイヌ語で「春の神」を意味する言葉から名前をとりました。
        </p>
      </section>
    </div>
  );
}
