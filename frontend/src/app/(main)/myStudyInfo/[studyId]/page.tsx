"use client";

import WeekHeader from "@/layouts/StudyStatus/weekHeaderProgress";
import StudyProgressSection from "@/layouts/StudyStatus/StudyProgressSection";
import CalendarAndProgressList from "@/layouts/StudyStatus/CalendarAndProgress";
import TodayVerification from "@/layouts/StudyStatus/TodayVerifyComponent";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@/layouts/common/UserContext";

export default function MyStudyInfoPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useUser();

    const [studyInfo, setStudyInfo] = useState<any>(null);

    function getApiBaseUrl(): string {
        return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
    }


    useEffect(() => {
        const fetchStudyInfo = async () => {
            try {
                const pageId = params.studyId; // 안전하게 접근
                if (!pageId || !user?.id) return;

                const res = await fetch(`${getApiBaseUrl()}/myStudyInfo/${pageId}?userId=${user.id}`);

                if (!res.ok) {
                    const errorData = await res.json().catch(() => null);

                    if (res.status === 403) {
                        alert("현재 참여한 스터디만 입장 가능합니다.");
                        router.push("/");
                        return;
                    }

                    throw new Error(errorData?.message || `HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setStudyInfo(data);
            } catch (err) {
                alert("스터디 정보를 불러오는 중 오류가 발생했습니다.");
                console.error("스터디 정보 가져오기 실패:", err);
                router.push("/");
            }
        };

        fetchStudyInfo();
    }, [params, user, router]);

    if (!studyInfo) return <div>로딩 중...</div>;

    const { progress, myInfo, studyRoomInfo, MemberProfile } = studyInfo;

    return (
        <main className="p-14 min-h-screen space-y-6 pl-40 pr-40">
            <div className="flex flex-col p-4 gap-4 border-2 border-gray-400 rounded-2xl ">
                <WeekHeader
                    currentWeek={progress.currentWeek}
                    weeklyRequiredCount={progress.weeklyRequiredCount}
                    myAuthCount={myInfo.authCount}
                    TotalWeek={progress.totalWeeks}
                />
                <StudyProgressSection
                    studyRoomInfo={studyRoomInfo}
                    myAuthCount={myInfo.authCount}
                    weeklyRequiredCount={progress.weeklyRequiredCount}
                    pageId={params.studyId}
                    userId={user?.id}
                    currentWeek={progress.currentWeek}
                />
            </div>
            <CalendarAndProgressList
                MemberProfile={MemberProfile}
                MemberProgress={progress.members}
                weeklyRequiredCount={progress.weeklyRequiredCount}
                MyInfoAuthCalendar={myInfo.authDates}
                MyRoomNumber={studyRoomInfo.id}
            />
            <TodayVerification MemberProfile={MemberProfile} MemberProgress={progress.members} />
        </main>
    );
}
