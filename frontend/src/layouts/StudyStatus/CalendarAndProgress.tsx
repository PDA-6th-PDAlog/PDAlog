"use client";

import { useRouter } from "next/navigation";
import ProgressBarComponent from "./ProgressBarComponent";

export default function CalendarAndProgressList() {
    const router = useRouter();

    const members = [
        { name: "person1", progress: 5 },
        { name: "person2", progress: 5 },
        { name: "person3", progress: 0 },
        { name: "person4", progress: 0 },
    ];

    function test() {
        router.push("/myStudyOtherPerson/person");
    }

    return (
        <section className="flex flex-col md:flex-row p-4 gap-4 border-2 border-gray-400 rounded-2xl">
            <div className="flex-1 space-y-2">
                <p className="text-sm font-semibold">전체 인원 진척도</p>
                {members.map((m, i) => (
                    <div
                        key={i}
                        className="flex items-center pl-5 gap-2 w-75 border-gray-400 border-1 rounded-2xl p-1 cursor-pointer hover:bg-gray-100"
                        onClick={test}>

                        <img src="/assets/person.png"
                            alt={m.name}
                            className="w-8 h-8 rounded-full object-cover"/>
                        <ProgressBarComponent progress={m.progress} total={7} />
                    </div>
                ))}
            </div>
            <div className="w-full md:w-[300px] border rounded shadow bg-white p-4">
                <p className="text-sm font-semibold mb-2">2024년 01월</p>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {Array.from({ length: 31 }, (_, i) => (
                        <div key={i} className="bg-orange-400 text-white rounded-full py-1">
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
