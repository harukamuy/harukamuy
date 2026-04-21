import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🐾</span>
          <span className="font-bold text-xl text-stone-800 group-hover:text-amber-600 transition-colors">
            harukamuy
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium"
          >
            ブログ
          </Link>
          <Link
            href="/blog?category=gomazochi"
            className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium"
          >
            ごまもち
          </Link>
          <Link
            href="/blog?category=sidefire"
            className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium"
          >
            サイドFIRE
          </Link>
          <Link
            href="/about"
            className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
