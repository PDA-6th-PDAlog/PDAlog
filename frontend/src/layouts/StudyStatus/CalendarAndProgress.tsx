"use client";

import { useRouter } from "next/navigation";
import ProgressBarComponent from "./ProgressBarComponent";
import Link from "next/link";

interface MemberProfileType {
    user_id: number;
    username: string;
    user_profile?: string;
}

interface MemberProgressType {
    user_id: number;
    count: number;
}

interface Props {
    MemberProfile: MemberProfileType[];
    MemberProgress: MemberProgressType[];
    weeklyRequiredCount: number;
    MyInfoAuthCalendar: string[];
    MyRoomNumber: number;
}

export default function CalendarAndProgressList({
                                                    MemberProfile,
                                                    MemberProgress,
                                                    weeklyRequiredCount,
                                                    MyInfoAuthCalendar,
                                                    MyRoomNumber,
                                                }: Props) {
    const router = useRouter();

    // 현재 연도와 월
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0부터 시작

    // 해당 달의 마지막 날짜 계산
    const lastDay = new Date(year, month + 1, 0).getDate();

    // 인증된 날짜들 필터링해서 day만 추출
    const markedDays = MyInfoAuthCalendar
        .map((dateStr) => new Date(dateStr))
        .filter((d) => d.getFullYear() === year && d.getMonth() === month)
        .map((d) => d.getDate());

    // 유저 진척도 정보 병합
    const mergedMembers = MemberProfile.map((profile) => {
        const progress = MemberProgress.find((p) => p.user_id === profile.user_id);
        return {
            ...profile,
            count: progress ? progress.count : 0,
        };
    });

    // 개인 페이지 이동
    const goToPersonPage = (userId: number) => {
        router.push(`/myStudyOtherPerson/${MyRoomNumber}/${userId}`);
    };

    return (
        <section className="flex flex-col md:flex-row p-4 gap-4 border-2 border-gray-400 rounded-2xl">
            {/* 왼쪽: 진척도 */}
            <div className="flex-1 space-y-2">
                <p className="text-sm font-semibold">전체 인원 진척도</p>
                {mergedMembers.map((m) => (
                    <div
                        key={m.user_id}
                        onClick={() => goToPersonPage(m.user_id)}
                        className="flex items-center pl-5 gap-2 w-75 border border-gray-400 rounded-2xl p-1 cursor-pointer hover:bg-gray-100"
                    >
                        <Link
                            href={`/profile/${m.user_id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-shrink-0"
                        >
                            <img
                                src={m.user_profile || "/assets/person.png"}
                                alt={m.username}
                                className="w-10 h-10 aspect-square rounded-full object-cover border border-gray-300 transition-transform duration-200 ease-in-out hover:scale-150"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = "/assets/person.png";
                                }}
                            />
                        </Link>

                        <span className="text-sm font-medium w-24">{m.username}</span>
                        <ProgressBarComponent
                            progress={m.count}
                            total={weeklyRequiredCount}
                        />
                    </div>
                ))}
            </div>

            {/* 오른쪽: 달력 */}
            <div className="w-full md:w-[300px] border rounded shadow bg-white p-4 self-start">
                <p className="text-sm font-semibold mb-2">
                    {year}년 {month + 1}월
                </p>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {Array.from({ length: lastDay }, (_, i) => {
                        const day = i + 1;
                        const isMarked = markedDays.includes(day);

                        return (
                            <div
                                key={day}
                                className={`rounded-full py-1 ${
                                    isMarked
                                        ? "bg-green-500 text-white font-bold"
                                        : "bg-gray-100 text-gray-600"
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
