"use client";

import { useRouter } from "next/navigation";
import ProgressBarComponent from "./ProgressBarComponent";

export default function CalendarAndProgressList({
                                                    MemberProfile,
                                                    MemberProgress,
                                                    weeklyRequiredCount,
                                                    MyInfoAuthCalendar,
                                                }: any) {
    const router = useRouter();

    // 현재 연도, 월 가져오기 (예: 2024년 1월)
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0부터 시작 (1월이면 0)

    // 인증 날짜들만 '일(day)'만 추출 (지금은 2024년 1월로 고정돼있으니 1월만 필터)
    const markedDays = MyInfoAuthCalendar
        .map((dateStr: string) => new Date(dateStr))
        .filter((d: Date) => d.getFullYear() === year && d.getMonth() === month)
        .map((d: Date) => d.getDate()); // 날짜만 추출

    const mergedMembers = MemberProfile.map((profile: any) => {
        const progress = MemberProgress.find((p: any) => p.user_id === profile.user_id);
        return {
            user_id: profile.user_id,
            username: profile.username,
            user_profile: profile.user_profile,
            count: progress ? progress.count : 0,
        };
    });

    const goToPersonPage = (userId: number) => {
        router.push(`/myStudyOtherPerson/${userId}`);
    };

    return (
        <section className="flex flex-col md:flex-row p-4 gap-4 border-2 border-gray-400 rounded-2xl">
            <div className="flex-1 space-y-2">
                <p className="text-sm font-semibold">전체 인원 진척도</p>

                {mergedMembers.map((m: any) => (
                    <div
                        key={m.user_id}
                        className="flex items-center pl-5 gap-2 w-75 border-gray-400 border-1 rounded-2xl p-1 cursor-pointer hover:bg-gray-100"
                        onClick={() => goToPersonPage(m.user_id)}
                    >
                        <img
                            src={m.user_profile || "/assets/person.png"}
                            alt={m.username}
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => (e.currentTarget.src = "/assets/person.png")}
                        />
                        <span className="text-sm font-medium w-24">{m.username}</span>
                        <ProgressBarComponent progress={m.count} total={weeklyRequiredCount} />
                    </div>
                ))}
            </div>

            {/* 달력 컴포넌트 */}
            <div className="w-full md:w-[300px] border rounded shadow bg-white p-4">
                <p className="text-sm font-semibold mb-2">
                    {year}년 {month + 1}월
                </p>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {Array.from({ length: 31 }, (_, i) => {
                        const day = i + 1;
                        const isMarked = markedDays.includes(day);

                        return (
                            <div
                                key={day}
                                className={`rounded-full py-1 ${
                                    isMarked ? "bg-green-500 text-white font-bold" : "bg-gray-100 text-gray-600"
                                }`}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
