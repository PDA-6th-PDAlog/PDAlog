"use client"

import StudyProofSection from "@/layouts/StudyOtherPerson/StudyProofComponent";
import CommentSection from "@/layouts/StudyOtherPerson/CommentComponent"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function myStudyOtherPersonPage() {
    const [teamInfo, setTeamInfo] = useState(null);

    const { StudyRoomId, studyId } = useParams();

    const safeStudyRoomId = Array.isArray(StudyRoomId) ? StudyRoomId[0] : StudyRoomId;
    const safeStudyMemberId = Array.isArray(studyId) ? studyId[0] : studyId;

    function getApiBaseUrl(): string {
        return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
    }

    useEffect(() => {
        const fetchStudyTeamInfo = async () => {
            try {
                const res = await fetch(`${getApiBaseUrl()}/myStudyInfo/${safeStudyRoomId}/${safeStudyMemberId}`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setTeamInfo(data);
            } catch (err) {
                console.error("스터디 팀 가져오기 실패:", err);
            }
        };

        if (safeStudyRoomId && safeStudyMemberId) {
            fetchStudyTeamInfo();
        }
    }, [safeStudyRoomId, safeStudyMemberId]);

    if (!teamInfo) return <div>로딩 중...</div>;

    const { getmyTeamInfoList } = teamInfo;

    return (
        <div className="p-14 min-h-screen pl-40 pr-40">
            <div className="flex flex-col p-4 gap-4">
                <StudyProofSection getmyTeamInfoList={getmyTeamInfoList} />
                {/* <StatisticsSection /> */}
                <CommentSection
                    studyRoomId={safeStudyRoomId}
                    studyMemberId={safeStudyMemberId}
                />
            </div>
        </div>
    );
}
