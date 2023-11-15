import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://brain-vitamin.vercel.app"),
  title: "경도인지장애 케어 서비스, 두뇌비타민",
  description: "치매예방, 두뇌훈련, 경도인지장애 케어",
  openGraph: {
    type: "website",
    title: "경도인지장애 케어 서비스, 두뇌비타민",
    description: "치매예방, 두뇌훈련, 경도인지장애 케어",
    url: "https://brain-vitamin.vercel.app",
    locale: "ko_KR",
    images: "/assets/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="4pyEhv9k7plm8lysksELbmxxFmH3IQozX7hBG1YWmcE"
        />
        <meta
          name="naver-site-verification"
          content="c18a9c3a8400fbbffd7d32b8d580d1705208298d"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
