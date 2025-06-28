"use client";

import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

export default function StudyProgressSection({
                                                 studyRoomInfo,
                                                 myAuthCount,
                                                 weeklyRequiredCount,
                                                 pageId,
                                                 userId,
                                                 currentWeek
                                             }: any) {
    const [showModal, setShowModal] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [inputText, setInputText] = useState("");

    const COLORS = ["#007bff", "#ddd"];
    const progressData = [
        { name: "완료", value: myAuthCount },
        { name: "남은 횟수", value: Math.max(weeklyRequiredCount - myAuthCount, 0) },
    ];

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setUploadedFile(file);
        }
    };

    const handleSubmit = async () => {
        if (myAuthCount >= studyRoomInfo.weeklyRequiredCount) {
            alert("이미 인증 횟수를 달성했습니다!");
            return;
        }
        if (!uploadedFile) {
            alert("이미지를 업로드해주세요.");
            return;
        }

        if (window.confirm("제출하시겠습니까?")) {
            const formData = new FormData();
            formData.append("file", uploadedFile);
            formData.append("content", inputText);
            formData.append("studyId", pageId);
            formData.append("userId", userId);
            formData.append("weekDate", new Date().toISOString().split("T")[0]);
            formData.append("currentWeek", currentWeek);

            try {
                const response = await fetch("http://localhost:3001/myStudyInfo/studyAuth", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("업로드 실패");

                alert("인증이 완료되었습니다.");
                setShowModal(false);
                setUploadedFile(null);
                setInputText("");
                location.reload();
            } catch (error) {
                console.error(error);
                alert("업로드 중 오류 발생");
            }
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setUploadedFile(null);
        setInputText("");
    };

    return (
        <>
            <section className="space-y-6">
                {/* 상단 요약 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border rounded-xl p-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-blue-700">{studyRoomInfo.title}</h2>
                        <p className="text-gray-700">{studyRoomInfo.description}</p>
                        <p className="text-sm text-gray-500">
                            📅 현재 주차: <span className="font-semibold">{currentWeek}주차</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            🔄 주당 인증 횟수:{" "}
                            <span className="font-semibold">{weeklyRequiredCount}회</span>
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="mt-3 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                        >
                            📁 인증하기
                        </button>
                    </div>

                    <div className="flex justify-center items-center">
                        <ResponsiveContainer width={200} height={200}>
                            <PieChart>
                                <Pie
                                    data={progressData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {progressData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center">
                            <p className="text-sm text-gray-600">진행률</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {Math.round((myAuthCount / weeklyRequiredCount) * 100)}%
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 인증 모달 */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>오늘의 스터디 인증하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border-2 border-dashed border-gray-400 rounded p-4 text-center mb-3"
                    >
                        {uploadedFile ? (
                            <div>
                                <p>{uploadedFile.name}</p>
                                <img
                                    src={URL.createObjectURL(uploadedFile)}
                                    alt="업로드 이미지"
                                    className="max-h-40 mx-auto mt-2 rounded"
                                />
                            </div>
                        ) : (
                            <div>
                                <p className="mb-2">이미지를 드래그 앤 드롭 하거나 파일을 선택하세요</p>
                                <div className="border-2 border-dashed border-gray-400 rounded text-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file && file.type.startsWith("image/")) {
                                                setUploadedFile(file);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="간단한 설명을 입력하세요"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        전송
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
