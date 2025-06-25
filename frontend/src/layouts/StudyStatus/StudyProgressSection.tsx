"use client"

import { useState } from "react";
import ProgressBarComponent from "./ProgressBarComponent";
import { Modal, Button, Form } from "react-bootstrap";

export default function StudyProgressSection() {
    const [showModal, setShowModal] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [inputText, setInputText] = useState("");

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setUploadedFile(file);
        }
    };

    const handleSubmit = () => {
        if (!uploadedFile) {
            alert("이미지를 업로드해주세요.");
            return;
        }

        if (window.confirm("제출하시겠습니까?")) {
            console.log("이미지:", uploadedFile);
            console.log("텍스트:", inputText);

            setShowModal(false);
            setUploadedFile(null);
            setInputText("");
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setUploadedFile(null);
        setInputText("");
    };

    return (
        <>
            <section className="space-y-4">
                <div className="space-y-2">
                    <div className="text-3xl font-medium">Title</div>
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold">스터디 진행 프로그램</div>
                        <button
                            className="border px-2 py-1 rounded bg-white shadow"
                            onClick={() => setShowModal(true)}>
                            📁 Select...
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-sm font-semibold">이번주 나의 진행 프로그램</p>
                    <ProgressBarComponent progress={5} total={7} />
                </div>
            </section>


            <Modal show={showModal} onHide={(handleClose)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>오늘의 스터디 인증하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border-2 border-dashed border-gray-400 rounded p-4 text-center mb-3">
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
                            <p>이미지를 이 영역에 드래그 앤 드롭 하세요</p>
                        )}
                    </div>

                    {/* 📝 텍스트 입력 */}
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
