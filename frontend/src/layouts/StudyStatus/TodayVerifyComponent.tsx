export default function TodayVerification() {
    const verifications = [
        {
            photoUrl: "/assets/study.jpg",
            userProfileUrl: "/assets/person.png",
        },
        {
            photoUrl: "/assets/study.jpg",
            userProfileUrl: "/assets/person.png",
        },
        {
            photoUrl: "/assets/study.jpg",
            userProfileUrl: "/assets/person.png",
        },
        {
            photoUrl: "/assets/study.jpg",
            userProfileUrl: "/assets/person.png",
        },
    ];

    return (
        <section className="p-4 gap-4 border-2 border-gray-400 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">이번 주차의 나의 인증 목록</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {verifications.map((v, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <img
                            src={v.photoUrl}
                            alt={`인증 ${i + 1}`}
                            className="w-full h-32 object-cover rounded"
                        />
                        <img
                            src={v.userProfileUrl}
                            alt="사용자 프로필"
                            className="w-10 h-10 rounded-full mt-2 border border-gray-300 object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
