import StudySection from "../layouts/ComponentsInMain/StudySection";
import PenaltySidebar from "../layouts/ComponentsInMain/PenaltySidebar";
import { userList } from "../layouts/ComponentsInMain/PenaltySidebar";
import PenaltyBarChart from "../layouts/ComponentsInMain/PenaltyBarChart";
import "../assets/styles/font.css";
import { Container } from "react-bootstrap";

const myStudies = [
  { id: 1, title: "스터디 A", imageUrl: "/assets/sh.png" },
  { id: 2, title: "스터디 B", imageUrl: "/assets/sh.png" },
];

const thumbnail = {
  list: [
    { id: 3, title: "다른 스터디 1", imageUrl: "/assets/sh.png" },
    { id: 4, title: "다른 스터디 2", imageUrl: "/assets/sh.png" },
  ],
};

const studyPenaltyData = [
  { study: "5월", amount: 12000 },
  { study: "6월", amount: 8000 },
  { study: "7월", amount: 9000 },
  { study: "8월", amount: 20000 },
  { study: "9월", amount: 18000 },
  { study: "10월", amount: 6000 },
];

export default function HomePage() {
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

            <PenaltyBarChart data={studyPenaltyData} />
          </Container>
        </main>

        <PenaltySidebar title="벌금 순위" users={userList} />
      </div>

      {/* ✅ Footer: 막대 그래프 */}
      <footer></footer>
    </div>
  );
}
