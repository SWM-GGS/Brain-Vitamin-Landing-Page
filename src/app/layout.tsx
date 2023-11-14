import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "경도인지장애 케어 서비스, 두뇌비타민",
  description: "치매예방, 두뇌훈련, 경도인지장애 케어",
  openGraph: {
    type: "website",
    title: "경도인지장애 케어 서비스, 두뇌비타민",
    description: "치매예방, 두뇌훈련, 경도인지장애 케어",
    url: "https://brain-vitamin.vercel.app",
    locale: "ko_KR",
    images: "https://avatars.githubusercontent.com/u/133128046",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
