"use client";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    profileImage: null,
    authCode: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files.length > 0) {
      setForm((prev) => ({ ...prev, profileImage: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("회원가입 제출! (백엔드 미연동)");
    console.log(form);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "480px" }}>
      <h2 className="mb-4 text-center">회원가입</h2>
      <Form onSubmit={handleSubmit}>
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

        <Form.Group controlId="formProfileImage" className="mb-3">
          <Form.Label>프로필 사진</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            name="profileImage"
            onChange={handleChange}
          />
          {previewImage && (
            <div className="mt-3 text-center">
              <Image
                src={previewImage}
                roundedCircle
                width={120}
                height={120}
                alt="프로필 미리보기"
              />
            </div>
          )}
        </Form.Group>

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

        <Button variant="primary" type="submit" className="w-100">
          회원가입
        </Button>
      </Form>
    </Container>
  );
}
