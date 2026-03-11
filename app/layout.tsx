import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "靈圖師 | NotebookLM 提示工坊",
  description: "靈圖師是專為教師、學生與知識工作者打造的 NotebookLM 圖表資訊提示詞平台。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
