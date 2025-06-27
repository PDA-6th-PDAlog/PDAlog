"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface Study {
  id: number;
  title: string;
  imageUrl?: string;
}

interface StudySectionProps {
  title: string;
  list: Study[];
  fontSize?: string;
  createBoxLabel?: string;
  createBoxLink?: string;
}

export default function StudySection({
  title,
  list,
  fontSize = "1.25rem",
  createBoxLabel = "스터디 생성하기",
  createBoxLink = "/createStudy",
}: StudySectionProps) {
  const [studies, setStudies] = useState<Study[]>([]);
  useEffect(() => {
    // list prop이 없거나 비어있을 때만 fetch
    if (list && list.length > 0) {
      setStudies(list);
      return;
    }
    const fetchStudies = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${baseUrl}/api/studies`);
        if (!res.ok) throw new Error("Failed to fetch studies");
        const data = await res.json();
        // thumbnail_url을 imageUrl로 매핑
        const mapped = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          imageUrl: item.thumbnail_url || undefined,
        }));
        setStudies(mapped);
      } catch (err) {
        setStudies([]);
      }
    };

    fetchStudies();
  }, [list]);
  const router = useRouter();

  return (
    <div
      style={{
        height: "30vh",
        width: "100%",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
        marginBottom: "2rem",
        padding: "1rem",
      }}
    >
      <h2 style={{ fontSize, marginBottom: "1rem", fontWeight: "bold" }}>
        {title}
      </h2>

      <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
        {studies.map((study) => (
          <div
            key={study.id}
            style={{
              width: "20vh",
              height: "20vh",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              flex: "0 0 auto",
            }}
          >
            {study.imageUrl ? (
              <img
                src={study.imageUrl}
                alt={study.title || "스터디"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaa",
                  fontSize: "12px",
                }}
              >
                {study.title || "No Title"}
              </div>
            )}
          </div>
        ))}

        {/* 생성 박스 - props로 분리 */}
        <div
          onClick={() => router.push(createBoxLink)}
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
          <div
            style={{
              fontSize: "1rem",
              color: "black",
              fontWeight: "bold",
            }}
          >
            {createBoxLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
