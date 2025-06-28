"use client"

import StudyProofSection from "@/layouts/StudyOtherPerson/StudyProofComponent";
import StatisticsSection from "@/layouts/StudyOtherPerson/StatisticsComponent"
import CommentSection from "@/layouts/StudyOtherPerson/CommentComponent"
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

export default function myStudyOtherPersonPage() {
    const [teamInfo, setTeamInfo] = useState(null);
    //요청받은 파라미터 아이티는 팀원 아이디임

    const { StudyRoomId, studyId } = useParams();


    useEffect(() => {
        const fetchStudyTeamInfo = async () => {
            try {
                const res = await fetch(`http://localhost:3001/myStudyInfo/${StudyRoomId}/${studyId}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setTeamInfo(data);
            } catch (err) {
                console.error("스터디 팀 가져오기 실패:", err);
            }
        };

        fetchStudyTeamInfo();
    }, []);

    if (!teamInfo) return <div>로딩 중...</div>;

    const {getmyTeamInfoList} = teamInfo;

    return(
        <div className="p-14 min-h-screen pl-40 pr-40">
            <div className="flex flex-col p-4 gap-4">
                <StudyProofSection
                    getmyTeamInfoList={getmyTeamInfoList}/>
                {/*<StatisticsSection/>*/}
                {/*<CommentSection/>*/}
            </div>
        </div>
    )
}