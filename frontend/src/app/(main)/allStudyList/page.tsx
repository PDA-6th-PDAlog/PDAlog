"use client";

import { use, useEffect, useState } from "react";

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
}
type Study = {
  id: number;
  title: string;
  description: string;
  thumbnail_url?: string | null;
  start_date: string;
  end_date: string;
  penalty_amount: number;
  weekly_required_count: number;
};
const [studies, setStudies] = useState<Study[]>([]);

const fetchStudies = async () => {
  const res = await fetch(`${getApiBaseUrl()}/`);
  const json = await res.json();
  const mapped = json.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    thumbnail_url: item.thumbnail_url ?? null,
    start_date: item.start_date,
    end_date: item.end_date,
    penalty_amount: item.penalty_amount,
    weekly_required_count: item.weekly_required_count,
  }));
  setStudies(mapped);
};

export default async function AllStudiesPage() {
  await fetchStudies();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>전체 스터디 목록</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {studies.map((study) => (
          <div
            key={study.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            {study.thumbnail_url ? (
              <img
                src={study.thumbnail_url}
                alt={study.title}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  color: "#aaa",
                }}
              >
                No Image
              </div>
            )}
            <h3 style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
              {study.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
