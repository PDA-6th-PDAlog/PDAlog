"use client";

import StudySection from "../layouts/ComponentsInMain/StudySection";
import PenaltySidebar from "../layouts/ComponentsInMain/PenaltySidebar";
import { userList } from "../layouts/ComponentsInMain/PenaltySidebar";
import PenaltyBarChart from "../layouts/ComponentsInMain/PenaltyBarChart";
import "../assets/styles/font.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [myStudies, setMyStudies] = useState([]);
  const [thumbnail, setThumbnail] = useState({ list: [] });

  useEffect(() => {
    const fetchStudies = async () => {
      const res = await fetch("/all-studies");
      const data = await res.json();
      // thumbnail_url을 imageUrl로 매핑
      const mapped = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        imageUrl: item.thumbnail_url || undefined,
      }));
      setMyStudies(mapped.slice(0, 2)); // 예시: 앞 2개를 내 스터디
      setThumbnail({ list: mapped.slice(2) }); // 나머지를 둘러보기
    };
    fetchStudies();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "MyFont",
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* 콘텐츠 영역: 메인 + 사이드바 가로 배치 */}
      <div
        style={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <main
          style={{
            borderLeft: "1px solid #ccc",
            borderRight: "1px solid #ccc",
            flexGrow: 1,
            // padding: "3rem 30vh",
          }}
        >
          <Container
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}
          >
            <StudySection
              title="참여중인 스터디"
              list={myStudies}
              fontSize="1.5rem"
              createBoxLabel="스터디 만들기"
              createBoxLink="/createStudy"
            />
            <StudySection
              title="다른 스터디 둘러보기"
              list={thumbnail.list}
              fontSize="1.5rem"
              createBoxLabel="스터디 더 둘러보기"
              createBoxLink="/createStudy"
            />

            {/*
            <PenaltyBarChart data={studyPenaltyData} />
            */}
          </Container>
        </main>

        <PenaltySidebar title="벌금 순위" users={userList} />
      </div>

      {/* ✅ Footer: 막대 그래프 */}
      <footer></footer>
    </div>
  );
}
