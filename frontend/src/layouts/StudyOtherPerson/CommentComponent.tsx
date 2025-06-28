"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/layouts/common/UserContext";
import Link from "next/link";

interface Comment {
    id: number;
    user_id: number;
    user_name: string;
    user_profile: string;
    study_member_id: number;
    content: string;
    create_at: string;
    study_room_id: number;
}

export default function CommentSection({ studyRoomId, studyMemberId }: any) {
    const { user } = useUser();

    const [comments, setComments] = useState<Comment[]>([]);
    const [input, setInput] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return `${d.getFullYear()}-${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")} ${d
            .getHours()
            .toString()
            .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
    };

    const fetchComments = async () => {
        try {
            const res = await fetch(
                `http://localhost:3001/myStudyInfo/comment/${studyRoomId}/${studyMemberId}`
            );
            if (!res.ok) throw new Error("댓글 불러오기 실패");
            const data = await res.json();
            setComments(data?.CommentStudyMember?.comments || []);
        } catch (error) {
            console.error("댓글 불러오기 실패", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [studyRoomId, studyMemberId]);

    const handleSubmit = async () => {
        if (!input.trim()) return;
        if (!user) {
            alert("로그인 후에 댓글을 작성할 수 있습니다.");
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch(
                `http://localhost:3001/myStudyInfo/comment/${studyRoomId}/${studyMemberId}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        studyRoomId,
                        studyMemberId,
                        userId: user.id,
                        userName: user.username,
                        userProfile: user.profile_image,
                        content: input.trim(),
                    }),
                }
            );

            if (!response.ok) throw new Error("댓글 작성 실패");

            await fetchComments();

            setInput("");
        } catch (error) {
            console.error(error);
            alert("댓글 작성 중 오류가 발생했습니다.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="p-6 space-y-4 border-2 border-gray-400 rounded-2xl bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">💬 댓글</h2>

            <ul className="space-y-6 max-h-[500px] overflow-y-auto">
                {comments.length === 0 && (
                    <li className="text-gray-500 text-center">댓글이 없습니다.</li>
                )}
                {comments.map((c) => (
                    <li
                        key={c.id ?? `${c.user_id}-${c.create_at}`}
                        className="flex gap-6 items-start border border-gray-200 p-4 rounded-xl bg-gray-50 hover:shadow-md transition-shadow"
                    >
                        <Link href={`/profile/${c.user_id}`}>
                            <img
                                src={c.user_profile || "/default-profile.png"}
                                alt={`${c.user_name} 프로필`}
                                className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-gray-300 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-130"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = "/default-profile.png";
                                }}
                            />
                        </Link>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-blue-700 text-lg">{c.user_name}</p>
                                <time
                                    dateTime={c.create_at}
                                    className="text-xs text-gray-400"
                                    title={new Date(c.create_at).toLocaleString()}
                                >
                                    {formatDate(c.create_at)}
                                </time>
                            </div>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap">{c.content}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-4 mt-8">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="댓글을 입력하세요"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    disabled={submitting}
                />
                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={submitting}
                >
                    {submitting ? "작성 중..." : "작성"}
                </button>
            </div>
        </section>
    );
}
