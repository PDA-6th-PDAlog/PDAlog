"use client";
import React, { useState } from "react";
import { Form, Button, Container, Image } from "react-bootstrap";

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    profileImage: null,
    authCode: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("회원가입 제출! (백엔드 미연동)");
    console.log(form);
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

        {/* 프로필 이미지 (드래그 앤 드롭 영역) */}
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

          {/* 숨겨진 input */}
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
