"use client";

import StudySection from "../layouts/ComponentsInMain/StudySection";
import PenaltySidebar from "../layouts/ComponentsInMain/PenaltySidebar";
import PenaltyBarChart from "../layouts/ComponentsInMain/PenaltyBarChart";
import "../assets/styles/font.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useUser, UserProvider } from "@/layouts/common/UserContext";

interface User {
  id: number;
  email: string;
  username: string;
  profile_image: string;
}

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

function HomePageContent() {
  // ✅ 훅은 컴포넌트 안에서만 써야 한다!
  const [myStudies, setMyStudies] = useState<Study[]>([]);
  const [studies, setStudies] = useState<Study[]>([]);
  const [userPenalties, setUserPenalties] = useState<any[]>([]);
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
            setUser(data.user);
          }
        })
        .catch(() => setUser(null));
    }
  }, [user, setUser]);

  useEffect(() => {
    const fetchMyStudies = async () => {
      if (!isLoggedIn || !user) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:3001/my-studies", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        user,
      }));

      setMyStudies(mapped);
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
        setUserPenalties(mapped);
      } catch (error) {
        console.error("fetchPenalties 함수 실행 중 오류 발생:", error);
      }
    };

    const fetchStudyPenalties = async () => {
      const res = await fetch("http://localhost:3001/weekly-fine-ranking");
      const json = await res.json();
      const mapped = json.data.map((item: any) => ({
        study: item.studyTitle,
        amount: item.totalFine,
      }));
      setPenalties(mapped);
    };

    // 호출
    fetchMyStudies();
    fetchStudies();
    fetchPenalties();
    fetchStudyPenalties();
  }, [isLoggedIn, user]);

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
            <PenaltyBarChart />
          </Container>
        </main>
        <PenaltySidebar users={userPenalties} />
      </div>
      <footer></footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <UserProvider>
      <HomePageContent />
    </UserProvider>
  );
}
