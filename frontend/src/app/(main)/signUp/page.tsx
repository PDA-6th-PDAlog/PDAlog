"use client";

import React, { useState } from "react";
import { Form, Button, Container, Image } from "react-bootstrap";

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    profileImage: null as File | null,
    authCode: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handle change");
    const { name, value, files } = e.target;

    if (name === "profileImage" && files && files.length > 0) {
      const file = files[0];
      setForm((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setForm((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = "";

    // 1. 프로필 이미지가 있으면 먼저 업로드
    if (form.profileImage) {
      const imageData = new FormData();
      imageData.append("file", form.profileImage);

      try {
        const uploadRes = await fetch("http://localhost:3001/test/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: imageData,
        });

        const uploadResult = await uploadRes.json();
        if (uploadRes.ok && uploadResult.url) {
          imageUrl = uploadResult.url; // 예: http://localhost:3001/uploads/파일명.jpg
        } else {
          alert("이미지 업로드 실패: " + uploadResult.message);
          return;
        }
      } catch (error) {
        console.error("이미지 업로드 에러:", error);
        alert("이미지 업로드 중 오류 발생");
        return;
      }
    }

    // 2. 회원가입 JSON payload 구성
    const payload = {
      username: form.name,
      email: form.email,
      passwd: form.password,
      profile_image: imageUrl,
      authCode: form.authCode,
    };

    try {
      const res = await fetch("http://localhost:3001/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("회원가입 성공!");
        console.log(data);
      } else {
        alert("회원가입 실패: " + data.message);
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("서버 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "480px" }}>
      <h2 className="mb-4 text-center">회원가입</h2>
      <Form onSubmit={handleSubmit}>
        {/* 이메일 */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@example.com"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* 이름 */}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="홍길동"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* 비밀번호 */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </Form.Group>

        {/* 프로필 이미지 */}
        <Form.Group className="mb-3">
          <Form.Label>프로필 사진</Form.Label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() =>
              document.getElementById("profileImageInput")?.click()
            }
            className="border border-dashed border-secondary rounded p-4 text-center"
            style={{ cursor: "pointer", backgroundColor: "#f9f9f9" }}
          >
            {previewImage ? (
              <div>
                <Image
                  src={previewImage}
                  roundedCircle
                  width={120}
                  height={120}
                  alt="프로필 미리보기"
                  className="mb-2 d-block mx-auto"
                />
                <p className="text-muted mb-0">
                  이미지를 클릭 또는 드래그해서 변경하세요
                </p>
              </div>
            ) : (
              <p className="text-muted mb-0">
                여기에 이미지를 드래그하거나 클릭하여 업로드하세요
              </p>
            )}
          </div>

          <Form.Control
            type="file"
            accept="image/*"
            name="profileImage"
            id="profileImageInput"
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </Form.Group>

        {/* 인증 코드 */}
        <Form.Group className="mb-4" controlId="formAuthCode">
          <Form.Label>프디아 인증 코드</Form.Label>
          <Form.Control
            type="text"
            placeholder="인증 코드를 입력하세요"
            name="authCode"
            value={form.authCode}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* 제출 버튼 */}
        <Button variant="primary" type="submit" className="w-100">
          회원가입
        </Button>
      </Form>
    </Container>
  );
}
