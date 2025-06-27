"use client";

import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // const errorData = await res.json();
        // throw new Error(errorData.message || "로그인 실패");
        setError("아이디 또는 비밀번호가 일치하지 않습니다.");
        // throw new Error(errorData.message || "로그인 실패");
        return;
      }

      const data = await res.json();
      console.log("로그인 성공:", data);

      Cookies.set("authToken", data.data.token, {
        expires: 1, // 1일간 유지
        secure: false, // HTTPS 환경에서만 (개발 중엔 false 가능)
        sameSite: "Lax", // CSRF 방지
      });

      alert("로그인 성공!");
      // TODO: 토큰 저장 & 페이지 이동 (ex: localStorage.setItem("token", data.token))
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("서버 오류입니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleGoToSignup = () => {
    alert("회원가입 페이지로 이동");
    // TODO: 라우팅 처리
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

        {error && <p className="text-danger">{error}</p>}

        <Button variant="primary" type="submit" className="w-100 mb-3">
          로그인
        </Button>

        <Button
          variant="outline-secondary"
          className="w-100"
          onClick={handleGoToSignup}>
          회원가입
        </Button>
      </Form>
    </Container>
  );
}
