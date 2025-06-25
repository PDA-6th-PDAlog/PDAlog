"use client";

export default function StudyProofSection() {
    const proofs = [
        {
            imageUrl: "/assets/study.jpg",
            description: "알고리즘 문제 3개를 풀었습니다!",
        },
        {
            imageUrl: "/assets/study.jpg",
            description: "CS 지식 정리 노트를 작성했어요.",
        },
        {
            imageUrl: "/assets/study.jpg",
            description: "React 스터디 내용을 복습했습니다.",
        },
        {
            imageUrl: "/assets/study.jpg",
            description: "오프라인 모임에 참여했습니다!",
        },
        {
            imageUrl: "/assets/study.jpg",
            description: "오늘은 회고를 작성하며 마무리했습니다.",
        },
    ];

    return (
        <section className="p-6 space-y-4 border-2 border-gray-400 rounded-2xl">
            <h2 className="text-xl font-semibold">주차별 학습 인증</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {proofs.map((proof, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-xl bg-gray-50 shadow-sm">
                        <img src={proof.imageUrl}
                            alt={`study-proof-${index + 1}`}
                            className="w-40 h-40 object-cover rounded-lg border"/>
                        <p className="text-gray-700 text-sm">{proof.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
