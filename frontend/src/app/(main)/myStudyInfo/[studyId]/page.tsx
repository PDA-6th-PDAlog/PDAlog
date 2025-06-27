"use client"

import WeekHeader from "@/layouts/StudyStatus/weekHeaderProgress";
import StudyProgressSection from "@/layouts/StudyStatus/StudyProgressSection";
import CalendarAndProgressList from "@/layouts/StudyStatus/CalendarAndProgress";
import TodayVerification from "@/layouts/StudyStatus/TodayVerifyComponent";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";


export default function MyStudyInfoPage() {

    // const { pageId } = useParams(); //

    const [studyInfo, setStudyInfo] = useState(null);

        useEffect(() => {
            const fetchStudyInfo = async () => {
                try {
                    //fetch경로
                    const res = await fetch(`http://localhost:3001/myStudyInfo/41?userId=1`);
                    // const res = await fetch(`http://localhost:3001/myStudyInfo/${pageId}?userId=1`);
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    const data = await res.json();
                    setStudyInfo(data);
                } catch (err) {
                    console.error("스터디 정보 가져오기 실패:", err);
                }
            };

            fetchStudyInfo();
        }, []);


    if (!studyInfo) return <div>로딩 중...</div>;

    const { progress, myInfo } = studyInfo;
    const {studyRoomInfo, MemberProfile} = studyInfo;


    return (
        <main className="p-14  min-h-screen space-y-6 pl-40 pr-40">
            <div className="flex flex-col p-4 gap-4 border-2 border-gray-400 rounded-2xl ">
                <WeekHeader
                    currentWeek={progress.currentWeek}
                    weeklyRequiredCount={progress.weeklyRequiredCount}
                    myAuthCount={myInfo.authCount}
                    TotalWeek={progress.totalWeeks}
                />
                <StudyProgressSection
                    studyRoomInfo={studyRoomInfo}
                    myAuthCount = {myInfo.authCount}
                    weeklyRequiredCount={progress.weeklyRequiredCount}
                />
            </div>
            <CalendarAndProgressList
                MemberProfile={MemberProfile}
                MemberProgress={progress.members}
                weeklyRequiredCount={progress.weeklyRequiredCount}
                MyInfoAuthCalendar={myInfo.authDates}
                MyRoomNumber={studyRoomInfo.id}
            />
            <TodayVerification
                MemberProfile={MemberProfile}
                MemberProgress={progress.members}
            />
        </main>
    );
}