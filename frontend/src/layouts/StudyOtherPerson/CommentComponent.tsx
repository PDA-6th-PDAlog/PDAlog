"use client";

import { useState } from "react";

export default function CommentSection() {
    const [comments, setComments] = useState<string[]>([
        "오늘도 고생 많았어요!",
        "열심히 하는 모습 보기 좋네요 ",
    ]);
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        if (!input.trim()) return;
        setComments((prev) => [...prev, input.trim()]);
        setInput("");
    };

    return (
        <section className=" p-6 border-2 border-gray-400 rounded-2xl">
            <h2 className="text-xl font-semibold">💬 댓글</h2>
            <ul className="text-gray-700">
                {comments.map((c, i) => (
                    <li key={i} className="border-b pb-2">{c}</li>
                ))}
            </ul>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="댓글을 입력하세요"/>

                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    작성
                </button>
            </div>
        </section>
    );
}
