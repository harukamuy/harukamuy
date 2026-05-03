import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = "https://harukamuy.com";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "harukamuy | ごまもちとサイドFIREの記録",
    template: "%s | harukamuy",
  },
  description:
    "ボストンテリアのごまもちと暮らすフリーランス映像プロデューサー・あずきが、サイドFIRE達成までの資産形成・投資・日常をゆるく発信するブログ。",
  authors: [{ name: "あずき", url: SITE_URL }],
  creator: "あずき",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "harukamuy",
    url: SITE_URL,
    title: "harukamuy | ごまもちとサイドFIREの記録",
    description:
      "ボストンテリアのごまもちと暮らすフリーランス映像プロデューサー・あずきが、サイドFIRE達成までの資産形成・投資・日常をゆるく発信するブログ。",
    images: [
      {
        url: "/images/mio-room.png",
        width: 1200,
        height: 630,
        alt: "harukamuy | ごまもちとサイドFIREの記録",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "harukamuy | ごまもちとサイドFIREの記録",
    description:
      "ボストンテリアのごまもちと暮らすフリーランス映像プロデューサー・あずきが、サイドFIRE達成までの資産形成・投資・日常をゆるく発信するブログ。",
    images: ["/images/mio-room.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&family=Caveat:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <meta name="google-site-verification" content="4CGA_h1VKtrpeC4f7HWzGs3QV5rX1fD5_ZQNfgNZ2KQ" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3731608068434256"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
