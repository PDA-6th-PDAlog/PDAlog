"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

export default function Page() {
  const params = useParams<{ myPage: string }>();
  const userId = params.myPage;

  function getApiBaseUrl(): string {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
  }

  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    profile_image: string;
  } | null>(null);

  const [studyData, setStudyData] = useState<any[]>([]);
  const [today, setToday] = useState<string>("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("userId", userId);
    if (!userId) {
      console.log("안뜸");
      return;
    }
    const fetchData = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/profile/${userId}`);
        const result = await res.json();
        setToday(result.day);
        console.log("응답 데이터:", result.day);

        if (result.success && result.data.length > 0) {
          setUserData(result.data[0]);
        }

        if (result.success && result.data2?.length > 0) {
          setStudyData(
            result.data2.map((item) => ({
              name: item.name,
              dates: item.dates,
              progress: { completed: 0, total: item.dates.length },
            }))
          );
          const studyCount = result.data2.length;
          console.log("참여중인 스터디 개수:", studyCount);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const dateHeaders =
    today !== ""
      ? Array.from({ length: 7 }, (_, i) =>
          dayjs(today)
            .subtract(6 - i, "day")
            .format("M/D")
        )
      : [];
  console.log("date", dateHeaders);

  // const getProgressPercentage = (completed: number, total: number) => {
  //   return (completed / total) * 100;
  // };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Section */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border-0">
          <div className="flex items-center gap-4">
            {userData?.profile_image ? (
              <img
                src={userData.profile_image}
                alt="Profile"
                className="w-16 h-16 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">
                  {userData?.username?.charAt(0) || "-"}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-black-900 mb-1">
                {userData?.username}
              </h1>
              <p className="text-gray-500 text-sm">{userData?.email}</p>
            </div>
          </div>
        </div>

        {/* Study Dashboard */}
        <div className="bg-gray-50 rounded-2xl shadow-sm border-0 overflow-hidden">
          <div className="p-6 pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              참여중인 스터디
              <span className="float-right text-blue-600 text-xl font-bold">
                {studyData.length}개
              </span>
            </h2>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="px-6">
              <div className="grid grid-cols-9 gap-2 pb-4 border-b border-gray-100">
                <div className="col-span-2 text-sm font-medium text-gray-600">
                  스터디명
                </div>
                {dateHeaders.map((date) => (
                  <div
                    key={date}
                    className="text-center text-sm font-medium text-gray-600"
                  >
                    {date}
                  </div>
                ))}
                {/* 진행률 헤더 주석처리 */}
                {/* <div className="text-center text-sm font-medium text-gray-600">
                  진행률
                </div> */}
              </div>
            </div>

            <div className="divide-y divide-gray-50">
              {studyData.map((study, index) => (
                <div
                  key={index}
                  className="px-6 py-5 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="grid grid-cols-9 gap-2 items-center">
                    <div className="col-span-2">
                      <span className="font-medium text-gray-900">
                        {study.name}
                      </span>
                    </div>
                    {study.dates.map((value, dateIndex) => (
                      <div key={dateIndex} className="flex justify-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            value === "O"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                    {/* 진행률 영역 주석처리 */}
                    {/* <div className="flex flex-col items-center gap-2">
                      <div className="w-full max-w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${getProgressPercentage(
                              study.progress.completed,
                              study.progress.total
                            )}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {study.progress.completed}/{study.progress.total}
                      </span>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden divide-y divide-gray-50">
            {studyData.map((study, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{study.name}</h3>
                  {/* 모바일 진행률 영역 주석처리 */}
                  {/* <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${getProgressPercentage(
                            study.progress.completed,
                            study.progress.total
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 min-w-8">
                      {study.progress.completed}/{study.progress.total}
                    </span>
                  </div> */}
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {dateHeaders.map((date, dateIndex) => (
                    <div key={dateIndex} className="text-center">
                      <div className="text-xs text-gray-500 mb-2">{date}</div>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium mx-auto ${
                          study.dates[dateIndex] === "O"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {study.dates[dateIndex]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}

        {/* <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-0">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {studyData.length}
            </div>
            <div className="text-sm text-gray-500">참여중인 스터디</div>
          </div> */}
        {/* <div className="bg-white rounded-2xl p-6 shadow-sm border-0">
            <div className="text-2xl font-bold text-blue-600 mb-1">75%</div>
            <div className="text-sm text-gray-500">평균 참여율</div>
          </div> */}
      </div>
    </div>
    // </div>
  );
}
