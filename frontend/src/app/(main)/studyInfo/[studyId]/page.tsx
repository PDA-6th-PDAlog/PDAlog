"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/layouts/common/UserContext";

export default function StudyRoomDetailPage() {
  const { studyId } = useParams();
  const [study, setStudy] = useState<any>(null);
  const { user, isLoggedIn } = useUser();
  const [isJoined, setIsJoined] = useState(false);

  const getTotalDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleJoin = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/study-rooms/${study.id}/join`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        alert("🎉 스터디에 참가했습니다!");

        const refreshed = await fetch(
          `http://localhost:3001/study-rooms/${study.id}`
        );
        const newData = await refreshed.json();
        setStudy(newData);
        setIsJoined(true);
      } else {
        alert(`⚠️ 참가 실패: ${data.message}`);
      }
    } catch (err) {
      console.error("스터디 참가 오류:", err);
      alert("😢 참가 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        if (!studyId) return;
        const res = await fetch(`http://localhost:3001/study-rooms/${studyId}`);
        const data = await res.json();
        setStudy(data);
      } catch (err) {
        console.error("스터디 정보 불러오기 실패", err);
      }
    };

    fetchStudy();
  }, [studyId, user]);

  useEffect(() => {
    if (study && study.members && user?.id) {
      study.members.forEach((member: any) => {
        if (member.id === user.id) {
          setIsJoined(true);
        }
      });
    }
  }, [study, user]);

  if (!study) {
    return (
      <p className="text-center text-gray-500 mt-10">
        스터디 정보를 불러오는 중...
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-2xl bg-white border border-gray-200 rounded-xl shadow-md px-6 py-6 space-y-6">
        {/* 스터디 정보 */}
        <section>
          <h4 className="text-xl font-semibold text-gray-800">{study.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{study.description}</p>
        </section>

        {/* 스터디 세부 정보 */}
        <section className="grid grid-cols-2 gap-4">
          <InfoBox label="진행 기간">
            <p className="text-sm text-gray-800">
              {study.start_date.slice(0, 10)} ~ {study.end_date.slice(0, 10)}
            </p>
            <p className="text-xs text-gray-400">
              총 {getTotalDays(study.start_date, study.end_date)}일
            </p>
          </InfoBox>

          <InfoBox label="인증 빈도">
            <p className="text-sm text-gray-800">
              {study.weekly_required_count === 7
                ? "매일"
                : `주 ${study.weekly_required_count}회`}
            </p>
          </InfoBox>

          <InfoBox label="벌금 금액">
            <p className="text-sm text-gray-800">
              {study.penalty_amount.toLocaleString()}원
            </p>
          </InfoBox>

          <InfoBox label="참여 인원">
            <p className="text-sm text-gray-800">{study.members.length}명</p>
          </InfoBox>
        </section>

        {/* 멤버 목록 */}
        <section>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            참여 멤버
          </h4>
          <div className="flex flex-wrap gap-3">
            {study.members.map((member: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center w-16">
                <img
                  src={member.profile_image}
                  alt={member.nickname}
                  className="h-10 w-10 rounded-full object-cover border border-gray-300"
                />
                <p className="text-xs text-gray-600 mt-1 text-center break-words">
                  {member.nickname}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 참여 버튼 */}
        <div className="flex justify-center">
          {isLoggedIn && isJoined ? (
            <button className="border border-red-300 text-red-600 text-sm px-4 py-1.5 rounded-md hover:bg-red-50 transition">
              스터디 나가기
            </button>
          ) : (
            <button
              onClick={handleJoin}
              className="border border-gray-300 text-gray-700 text-sm px-4 py-1.5 rounded-md hover:bg-gray-100 transition">
              스터디 참여하기
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

function InfoBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-md px-3 py-2 bg-gray-50">
      <p className="text-xs text-gray-500">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
