//StudySection.tsx
"use client";

import { linkSync } from "fs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Study {
  id: number;
  title: string;
  description: string;
  thumbnail_url?: string | null; // 백엔드에서 null일 수도 있음
  start_date: string; // ISO 형식의 날짜 문자열
  end_date: string;
  penalty_amount: number;
  weekly_required_count: number;
}

interface StudySectionProps {
  title: string;
  list: Study[];
  fontSize?: string;
  link?: string;
  createBoxLink?: string;
}

export default function StudySection({
  title,
  list,
  fontSize = "1.25rem",
  link,
  createBoxLink,
}: StudySectionProps) {
  const router = useRouter();
  // // 컴포넌트 렌더링
  // // 전체 스터디 목록을 렌더링
  return (
    <div
      style={{
        height: "30vh",
        width: "100%",
        // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
        marginBottom: "2rem",
        padding: "1rem",
      }}
    >
      <h2 style={{ fontSize, marginBottom: "1rem", fontWeight: "bold" }}>
        {title}
      </h2>

      <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
        {list.map((study) => (
          <div
            key={study.id}
            onClick={() => {
              if (link) {
                router.push(`${link}/${study.id}`);
              }
            }}
            style={{
              width: "25vh",
              height: "25vh",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              // boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              flex: "0 0 auto",
              cursor: link ? "pointer" : "default",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              padding: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "70%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {study.thumbnail_url ? (
                <img
                  src={study.thumbnail_url}
                  alt={study.title || "스터디"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
              ) : (
                <img
                  src={"/assets/None_Thumbnail.jpeg"}
                  alt={study.title || "스터디"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
              )}
            </div>
            <div
              style={{
                width: "100%",
                height: "30%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: "1rem",
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                padding: "0 0.5rem",
              }}
            >
              {study.title}
            </div>
          </div>
        ))}

        {/* 생성 박스 - props로 분리 */}
        <div
          onClick={() => {
            if (createBoxLink) {
              router.push(createBoxLink);
            }
          }}
          style={{
            width: "20vh",
            height: "20vh",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "2px dashed #ccc",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#007bff";
            e.currentTarget.style.backgroundColor = "#f8f9fa";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#ccc";
            e.currentTarget.style.backgroundColor = "white";
          }}
        >
          스터디생성하기
          <div
            style={{
              fontSize: "1rem",
              color: "black",
              fontWeight: "bold",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
