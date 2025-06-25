import WeekHeader from "@/layouts/StudyStatus/weekHeaderProgress";
import StudyProgressSection from "@/layouts/StudyStatus/StudyProgressSection";
import CalendarAndProgressList from "@/layouts/StudyStatus/CalendarAndProgress";
import TodayVerification from "@/layouts/StudyStatus/TodayVerifyComponent";


export default function MyStudyInfoPage() {
    return (
        <main className="p-14 bg-sky-50 min-h-screen space-y-6 pl-40 pr-40">
            <div className="flex flex-col p-4 gap-4 border-2 border-gray-400 rounded-2xl ">
                <WeekHeader />
                <StudyProgressSection />
            </div>
            <CalendarAndProgressList />
            <TodayVerification />
        </main>
    );
}