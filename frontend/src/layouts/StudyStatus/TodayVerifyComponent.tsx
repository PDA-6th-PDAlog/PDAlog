"use client";

import Link from "next/link";

export default function TodayVerification({ MemberProfile, MemberProgress }: any) {
    // user_id 기준으로 MemberProgress + MemberProfile 병합
    const verifications = MemberProgress.map((progress: any) => {
        const profile = MemberProfile.find((p: any) => p.user_id === progress.user_id);

        return {
            userId: progress.user_id,
            photoUrl: progress.latestImage,
            userProfileUrl: profile?.user_profile || "/assets/person.png",
            username: profile?.username || "이름없음",
        };
    });

    return (
        <section className="p-4 gap-4 border-2 border-gray-400 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">이번 주차의 인증 썸네일</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {verifications.map((v: any, i: any) => (
                    <div key={i} className="flex flex-col items-center">
                        <img
                            src={v.photoUrl}
                            alt={`인증 ${i + 1}`}
                            className="w-full h-32 object-cover rounded"
                        />
                        <Link href={`/profile/${v.userId}`}>
                            <img
                                src={v.userProfileUrl}
                                alt={`${v.username} 프로필`}
                                className="w-10 h-10 rounded-full mt-2 border border-gray-300 object-cover transition-transform duration-200 ease-in-out hover:scale-160 cursor-pointer"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = "/assets/person.png";
                                }}
                            />
                        </Link>
                        <p className="text-sm mt-1">{v.username}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
