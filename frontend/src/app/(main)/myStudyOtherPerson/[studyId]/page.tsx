import StudyProofSection from "@/layouts/StudyOtherPerson/StudyProofComponent";
import StatisticsSection from "@/layouts/StudyOtherPerson/StatisticsComponent"
import CommentSection from "@/layouts/StudyOtherPerson/CommentComponent"

export default function myStudyOtherPersonPage() {
    return(
        <div className="p-14 bg-sky-50 min-h-screen pl-40 pr-40">
            <div className="flex flex-col p-4 gap-4">
                <StudyProofSection/>
                <StatisticsSection/>
                <CommentSection/>
            </div>
        </div>
    )
}