"use client";

import StudySection from "../layouts/ComponentsInMain/StudySection";
import PenaltySidebar from "../layouts/ComponentsInMain/PenaltySidebar";
import PenaltyBarChart from "../layouts/ComponentsInMain/PenaltyBarChart";
import "../assets/styles/font.css";
import { Container } from "react-bootstrap";
import { use, useEffect, useState } from "react";
import { useUser } from "@/layouts/common/UserContext";
import Cookies from "js-cookie";
type Study = {
  id: number;
  title: string;
  description: string;
  thumbnail_url?: string | null;
  start_date: string;
  end_date: string;
  penalty_amount: number;
  weekly_required_count: number;
};

type StudyPenalty = {
  study: string;
  amount: number;
};

// const dummyPenaltyData: StudyPenalty[] = [
//   { study: "알고리즘 스터디", amount: 15000 },
//   { study: "CS 전공책 읽기", amount: 8000 },
//   { study: "면접 대비 모의질문", amount: 23000 },
//   { study: "영어 회화", amount: 5000 },
//   { study: "프로젝트 협업", amount: 12000 },
// ];

export default function HomePage() {
  const [myStudies, setMyStudies] = useState<Study[]>([]);
  const [studies, setStudies] = useState<Study[]>([]);
  const [userPenalties, setuserPenalties] = useState<any[]>([]); // 사이드바 페널티 컨트롤
  const [penalties, setPenalties] = useState<StudyPenalty[]>([]); // 벌금 랭킹 차트
  const { user } = useUser();
  function getApiBaseUrl(): string {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
  }

  useEffect(() => {
    const fetchMyStudies = async () => {
      try {
        const token = Cookies.get("authToken");
        console.log("[fetchMyStudies] token:", token); // DEBUG: print token

        const res = await fetch("http://localhost:3001/my-studies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            include: "credentials", // 쿠키를 포함하기 위해 추가
          },
        });

        if (!res.ok) {
          let errorText = await res.text();
          console.error("서버 오류:", res.status, errorText); // Log status and error body
          return;
        }
        console.log("서버 응답 상태:", res.status); // Log response status
        console.log("서버 응답 헤더:", res.headers.get("Content-Type")); // Log content type
        console.log("서버 응답 헤더:", res); // Log content length
        const json = await res.json();

        const mapped = json.data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          thumbnailUrl: item.thumbnail_url ?? null,
          startDate: item.start_date,
          endDate: item.end_date,
          penaltyAmount: item.penalty_amount,
          weeklyRequiredCount: item.weekly_required_count,
        }));

        setMyStudies(mapped);
      } catch (error) {
        console.error("fetchMyStudies error:", error);
      }
    };

    const fetchPenalties = async () => {
      try {
        // 안전을 위해 try-catch 블록을 사용하는 것을 권장합니다.
        const res = await fetch(`${getApiBaseUrl()}/fine-ranking`);

        if (!res.ok) {
          // 응답이 성공적이지 않을 경우 에러 처리
          console.error(
            "Failed to fetch penalties:",
            res.status,
            res.statusText
          );
          return;
        }

        const json = await res.json();
        console.log("서버 응답 원본 (fine-ranking):", json); // 서버에서 받은 JSON 데이터를 직접 확인

        const data = Array.isArray(json) ? json : []; // json이 배열이면 그대로 사용, 아니면 빈 배열

        console.log("처리된 데이터 배열 (data):", data); // 매핑 전 데이터 확인

        const mapped = data.map((item: any) => ({
          id: item.email, // 각 항목의 email을 id로 사용
          name: item.username, // 각 항목의 username을 name으로 사용
          amount: item.totalPenalty, // 각 항목의 totalPenalty를 amount로 사용
          profileImage: item.profileImage ?? null, // profileImage가 없으면 null
        }));

        console.log("매핑된 최종 데이터 (userPenalties):", mapped); // setuserPenalties에 들어갈 최종 데이터 확인
        setuserPenalties(mapped);
      } catch (error) {
        console.error("fetchPenalties 함수 실행 중 오류 발생:", error);
      }
    };

    const fetchStudies = async () => {
      const res = await fetch(`${getApiBaseUrl()}/`);
      const json = await res.json();
      const mapped = json.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        thumbnail_url: item.thumbnail_url ?? null,
        start_date: item.start_date,
        end_date: item.end_date,
        penalty_amount: item.penalty_amount,
        weekly_required_count: item.weekly_required_count,
      }));
      setStudies(mapped);
    };

    const fetchstudyPenalties = async () => {
      const res = await fetch(`${getApiBaseUrl()}/weekly-fine-ranking`);
      const json = await res.json();

      const mapped = json.data.map((item: any) => ({
        study: item.studyTitle,
        amount: item.totalFine,
      }));

      setPenalties(mapped);
    };
    fetchstudyPenalties();
    fetchMyStudies();
    fetchStudies();
    fetchPenalties();
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
            // borderRight: "1px solid #ccc",
            flexGrow: 1,
          }}
        >
          <div className="pl-4 pr-4">
            <Container
              style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem" }}
            >
              <StudySection
                title="My Study"
                list={myStudies}
                link="/myStudyInfo"
                fontSize="1.5rem"
                createBoxLink="/createStudy"
                boxTitle="새로운 스터디 만들기"
              />
              <div className="pb-6"></div>
              <StudySection
                title="Study List"
                list={studies}
                link="/studyInfo"
                fontSize="1.5rem"
                createBoxLink="/createStudy"
                boxTitle="스터디 더 둘러보기"
              />
              <PenaltyBarChart />
              {/*<PenaltyBarChart data={penalties} />*/}
            </Container>
          </div>
        </main>

        <PenaltySidebar users={userPenalties} />
      </div>

      <footer></footer>
    </div>
  );
}
