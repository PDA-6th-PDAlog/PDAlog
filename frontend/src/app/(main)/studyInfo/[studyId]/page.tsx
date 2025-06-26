"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StudyRoomDetailPage() {
  const { studyId } = useParams(); // ✅ URL의 [studyId]를 가져옴
  const [study, setStudy] = useState<any>(null);

  const getTotalDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
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
  }, [studyId]);

  if (!study) {
    return (
      <p className="text-center text-gray-500">스터디 정보를 불러오는 중...</p>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="bg-indigo-500 text-white px-6 py-3 rounded-t-lg">
            <h4 className="text-base font-semibold">스터디방 정보</h4>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {study.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{study.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-md">
                  <span className="text-lg text-gray-400">📅</span>
                  <div>
                    <p className="font-medium text-gray-800">진행 기간</p>
                    <p className="text-sm text-gray-600">
                      {study.start_date.slice(0, 10)} ~{" "}
                      {study.end_date.slice(0, 10)}
                    </p>
                    <span className="inline-block mt-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
                      총 {getTotalDays(study.start_date, study.end_date)}일
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-md">
                  <span className="text-lg text-gray-400">⏰</span>
                  <div>
                    <p className="font-medium text-gray-800">인증 빈도</p>
                    <p className="text-sm text-gray-600">
                      {study.weekly_required_count === 7
                        ? "매일"
                        : `주 ${study.weekly_required_count}회`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-md">
                  <span className="text-lg text-gray-400">💰</span>
                  <div>
                    <p className="font-medium text-gray-800">벌금 금액</p>
                    <p className="text-sm text-red-600 font-semibold">
                      {study.penalty_amount.toLocaleString()}원
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-md">
                  <span className="text-base text-gray-400">👥</span>
                  <div>
                    <p className="font-medium text-gray-800">참여 멤버</p>
                    <p className="text-sm text-gray-600">
                      {study.members.length}명 참여 중
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                <span className="text-gray-400">👥</span> 참여 멤버
              </h3>
              <div className="flex flex-wrap gap-3">
                {study.members.map((member: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-3 border border-gray-200 rounded-md shadow-sm bg-white">
                    <img
                      src={member.profile_image}
                      alt={member.nickname}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <p className="mt-2 text-sm text-gray-700">
                      {member.nickname}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-1.5 rounded-md shadow-sm transition-all">
                ⚡ 스터디 참여하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
