import ProgressBarComponent from "@/layouts/StudyStatus/ProgressBarComponent";
import ProgressDonutChart from "@/layouts/StudyStatus/ProgressDonutChart";

interface WeekHeaderProps {
    currentWeek: number;
    weeklyRequiredCount: number;
    myAuthCount: number;
    TotalWeek: number;
}

export default function WeekHeader({
                                       currentWeek,
                                       weeklyRequiredCount,
                                       myAuthCount,
                                       TotalWeek,
                                   }: WeekHeaderProps) {
    const buttons = Array.from({ length: weeklyRequiredCount }, (_, i) => (
        <div
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                i < myAuthCount ? "bg-green-500" : "bg-gray-300"
            }`}
        >
            {i < myAuthCount ? "✔" : "－"}
        </div>
    ));

    return (
        <section className="grid md:grid-cols-4 gap-6 bg-white p-6 rounded-xl shadow-md">
            {/* 📅 현재 주차 */}
            <div className="text-center space-y-1">
                <div className="text-gray-500 text-sm">현재 주차</div>
                <div className="text-2xl font-bold text-blue-700">{currentWeek}주차</div>
            </div>

            {/* 🧩 인증 카운트 버튼 */}
            <div className="text-center">
                <div className="text-gray-500 text-sm mb-2">이번주 인증</div>
                <div className="flex justify-center gap-2">{buttons}</div>
            </div>

            {/* 📈 전체 주차 */}
            <div className="text-center space-y-1">
                <div className="text-gray-500 text-sm">전체 주차</div>
                <div className="text-xl font-bold text-gray-800">{TotalWeek}주차</div>
            </div>

            {/* 📊 전체 진척도 */}
            <div className="text-center">
                <div className="text-gray-500 text-sm mb-2">스터디 전체 진행 비율</div>
                <ProgressDonutChart currentWeek={currentWeek} totalWeek={TotalWeek} />
            </div>
        </section>
    );
}
