import StudySection from "./(main)/Components/StudySection";
import PenaltySidebar from "./(main)/Components/PenaltySidebar";
import { userList } from "./(main)/Components/PenaltySidebar";
import PenaltyBarChart from "./(main)/Components/PenaltyBarChart";

const myStudies = [
  { id: 1, title: "스터디 A" },
  { id: 2, title: "스터디 B" },
];

const thumbnail = {
  list: [
    { id: 3, title: "다른 스터디 1", imageUrl: "/thumb1.jpg" },
    { id: 4, title: "다른 스터디 2", imageUrl: "/thumb2.jpg" },
    { id: 5, title: "다른 스터디 3" },
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
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* 콘텐츠 영역: 메인 + 사이드바 가로 배치 */}
      <div style={{ display: "flex", flexGrow: 1 }}>
        <main style={{ flexGrow: 1, padding: "2rem", backgroundColor: "#fff" }}>
          <StudySection
            title="참여중인 스터디"
            list={myStudies}
            fontSize="1.5rem"
          />
          <StudySection
            title="다른 스터디 둘러보기"
            list={thumbnail.list}
            fontSize="1.25rem"
          />
          <button>스터디 만들기</button>
        </main>

        <PenaltySidebar title="벌금 순위" users={userList} />
      </div>

      {/* ✅ Footer: 막대 그래프 */}
      <footer style={{ padding: "1rem 0" }}>
        <PenaltyBarChart data={studyPenaltyData} />
      </footer>
    </div>
  );
}
