import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "짬짬이 - 나만의 복습 앱",
  description: "오늘 찍은 문장, 내일 바로 복습",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-[100dvh] antialiased bg-gray-100 overflow-hidden overscroll-none">
      <body className="h-full flex flex-col items-center justify-center overflow-hidden overscroll-none m-0 p-0">
        {/* 모바일 화면 래퍼 (Mobile Wrapper) */}
        <div className="w-full h-full sm:w-[390px] sm:h-[844px] bg-background sm:shadow-2xl sm:rounded-[40px] overflow-hidden relative flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
