import ProgressBarComponent from "@/layouts/StudyStatus/ProgressBarComponent";

interface WeekHeaderProps {
    currentWeek: number;
    weeklyRequiredCount: number;
    myAuthCount: number;
    TotalWeek: number;
}

export default function WeekHeader({ currentWeek, weeklyRequiredCount, myAuthCount, TotalWeek}: WeekHeaderProps) {
    const buttons = Array.from({ length: weeklyRequiredCount }, (_, i) => (
        <button
            key={i}
            className="px-2 py-1 border rounded w-10 h-10"
        >
            {i < myAuthCount ? '⭕' : '-'}
        </button>
    ));

    return (
        <div className="flex items-center">
            <h1 className="text-xl font-semibold">{currentWeek}주차</h1>
            <div className="flex gap-2 pl-10">
                {buttons}
            </div>
            <div>
                <div className="text-xl font-semibold">전체 주차:</div>
                <div className="gap-2 pl-10">
                    {TotalWeek}
                </div>
            </div>
            <div>
                <p className="text-sm font-semibold">전체 진척도</p>
                <ProgressBarComponent progress={currentWeek} total={TotalWeek} />
            </div>
        </div>
    );
}
