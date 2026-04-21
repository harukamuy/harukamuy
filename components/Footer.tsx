export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-20">
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-stone-500 text-sm">
        <p>© {new Date().getFullYear()} harukamuy — ごまもちとサイドFIREの記録</p>
      </div>
    </footer>
  );
}
