"use client";
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert("로그인 버튼 클릭! (백엔드 미연동)");
    console.log(form);
  };

  const handleGoToSignup = () => {
    // TODO: 회원가입 페이지로 이동 (라우터 연동 필요)
    alert("회원가입 페이지로 이동");
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "480px" }}>
      <h2 className="mb-4 text-center">로그인</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="loginEmail">
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

        <Form.Group className="mb-4" controlId="loginPassword">
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

        <Button variant="primary" type="submit" className="w-100 mb-3">
          로그인
        </Button>

        <Button
          variant="outline-secondary"
          className="w-100"
          onClick={handleGoToSignup}
        >
          회원가입
        </Button>
      </Form>
    </Container>
  );
}
