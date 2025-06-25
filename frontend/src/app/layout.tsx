// app/layout.tsx
import "./globals.css";
import AppNavbar from "@/layouts/MyNavbar/MyNavbar"; // ✅ 클라이언트 컴포넌트를 import
import "../assets/styles/font.css"; // 또는 ./assets/styles/font.css
export const metadata = {
  title: "My Project",
  description: "스터디 인증 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AppNavbar /> {/* 클라 컴포넌트 OK */}
        {children}
      </body>
    </html>
  );
}
