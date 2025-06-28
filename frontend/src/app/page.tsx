"use client";

import StudySection from "../layouts/ComponentsInMain/StudySection";
import PenaltySidebar from "../layouts/ComponentsInMain/PenaltySidebar";
import PenaltyBarChart from "../layouts/ComponentsInMain/PenaltyBarChart";
import "../assets/styles/font.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useUser, UserProvider } from "@/layouts/common/UserContext";

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

export default function HomePage() {
  return (
    <UserProvider>
      <HomePageContent />
    </UserProvider>
  );
}

function HomePageContent() {
  const [myStudies, setMyStudies] = useState<Study[]>([]);
  const [studies, setStudies] = useState<Study[]>([]);
  const [userPenalties, setuserPenalties] = useState<any[]>([]);
  const [penalties, setPenalties] = useState<StudyPenalty[]>([]);
  const { user, isLoggedIn, setUser } = useUser();

  useEffect(() => {
    if (!user) {
      fetch("http://localhost:3001/login/protected", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isLoggedIn) {
            setUser(data.user); // ✅ 전역에 유저 저장
          }
        })
        .catch(() => setUser(null));
    }
  }, [user, setUser]);

  useEffect(() => {
    const fetchMyStudies = async () => {
      const res = await fetch("http://localhost:3001/my-studies");
      const json = await res.json();
      let mapped = json.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        thumbnail_url: item.thumbnail_url ?? null,
        start_date: item.start_date,
        end_date: item.end_date,
        penalty_amount: item.penalty_amount,
        weekly_required_count: item.weekly_required_count,
      }));
      if (isLoggedIn && user) {
        mapped = mapped.map((study: any) => ({
          ...study,
          user, // 로그인된 유저 정보 추가
        }));
      }
      setMyStudies(mapped);
    };

    const fetchPenalties = async () => {
      try {
        const res = await fetch("http://localhost:3001/fine-ranking");
        if (!res.ok) {
          console.error(
            "Failed to fetch penalties:",
            res.status,
            res.statusText
          );
          return;
        }
        const json = await res.json();
        const data = Array.isArray(json) ? json : [];
        const mapped = data.map((item: any) => ({
          id: item.email,
          name: item.username,
          amount: item.totalPenalty,
          profileImage: item.profileImage ?? null,
        }));
        setuserPenalties(mapped);
      } catch (error) {
        console.error("fetchPenalties 함수 실행 중 오류 발생:", error);
      }
    };

    const fetchStudies = async () => {
      const res = await fetch("http://localhost:3001/");
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
      const res = await fetch("http://localhost:3001/weekly-fine-ranking");
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
          }}
        >
          <Container
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "2rem",
            }}
          >
            {isLoggedIn && (
              <StudySection
                title="참여중인 스터디"
                list={myStudies}
                link="/myStudyInfo"
                fontSize="1.5rem"
                createBoxLink="/createStudy"
              />
            )}
            <StudySection
              title="다른 스터디 둘러보기"
              list={studies}
              link="/studyInfo"
              fontSize="1.5rem"
              createBoxLink="/createStudy"
            />
            <PenaltyBarChart data={penalties} />
          </Container>
        </main>
        <PenaltySidebar users={userPenalties} />
      </div>
      <footer></footer>
    </div>
  );
}
