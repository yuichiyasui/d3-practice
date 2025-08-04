import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D3 Practice",
  description: "A playground for D3.js visualizations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
