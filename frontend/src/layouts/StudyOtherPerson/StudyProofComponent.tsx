"use client";

export default function StudyProofSection({ getmyTeamInfoList }: any) {
    return (
        <section className="p-6 space-y-4 border-2 border-gray-400 rounded-2xl bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">주차별 학습 인증</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getmyTeamInfoList && getmyTeamInfoList.length > 0 ? (
                    getmyTeamInfoList.map((proof: any, index: number) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row items-center gap-4 border border-gray-200 p-4 rounded-xl bg-gray-50 hover:shadow-md transition-shadow"
                        >
                            <img
                                src={proof.proof_image}
                                alt={`study-proof-${index + 1}`}
                                className="w-40 h-40 object-cover rounded-lg border border-gray-300"
                            />
                            <div className="flex flex-col justify-center">
                                <p className="text-sm text-gray-600">{proof.content}</p>
                                <p className="text-xs text-gray-400 mt-2">
                                    인증일: {new Date(proof.week_date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">인증 기록이 없습니다.</p>
                )}
            </div>
        </section>
    );
}
