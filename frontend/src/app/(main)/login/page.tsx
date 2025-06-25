"use client";

import { useEffect, useState, useRef } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); //

  // const handleSubmit = async () => {
  // 	const email = emailRef.current?.value;
  // 	const password = passwordRef.current?.value;

  // 	const response = await fetch('http://localhost:4000/users/login', {
  // 		method: 'POST',
  // 		headers: {
  // 			'Content-Type': 'application/json',
  // 		},
  // 		body: JSON.stringify({ email, password }),
  // 	});

  // 	router.push('/boards');
  // };

  return (
    <div
      style={{
        backgroundImage: `url("/wave.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1 style={{ fontSize: "1rem", padding: "10px" }}>회원가입</h1>

      <input
        type="text"
        ref={emailRef}
        placeholder="00000@naver.com"
        style={{ border: "2px solid #ccc" }}
      />

      <div style={{ padding: "10px" }}> </div>
      <div>
        <input
          type="text"
          ref={passwordRef}
          placeholder="비밀번호"
          style={{ border: "2px solid #ccc" }}
        />
      </div>
      <button style={{ marginTop: "20px", border: "2px solid #ccc" }}>
        로그인하기
      </button>
    </div>
  );
}
