// app/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import AppNavbar from "@/layouts/MyNavbar/MyNavbar"; // ✅ 클라이언트 컴포넌트를 import
import "../assets/styles/font.css"; // 또는 ./assets/styles/font.css
import container from "@/assets/styles/container.module.css"; // ✅ CSS 모듈을 import
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            fontFamily: "MyFont",
            backgroundImage: "url('/assets/bg_top.png')",
            backgroundRepeat: "no-repeat",
            width: "100%",
            backgroundPosition: "center top", // ✅ 가로 중앙, 세로 맨 위
            backgroundSize: "contain", // ✅ 이미지 크기 그대로 표시
            position: "relative",
            zIndex: 0,
          }}
        >
          <AppNavbar /> {/* 클라 컴포넌트 OK */}
          {children}
        </div>
      </body>
    </html>
  );
}
