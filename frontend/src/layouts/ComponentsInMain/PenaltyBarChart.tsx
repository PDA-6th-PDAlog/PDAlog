"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";

type StudyPenalty = {
  study: string;
  amount: number;
};

export default function PenaltyBarChart() {
  const [data, setData] = useState<StudyPenalty[]>([]);

  function getApiBaseUrl(): string {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/weekly-fine-ranking`);
        const json = await res.json();

        if (json.success && json.data) {
          const mapped: StudyPenalty[] = json.data.map((item: any) => ({
            study: item.studyTitle,
            amount: item.totalFine,
          }));

          setData(mapped);
        }
      } catch (err) {
        console.error("벌금 랭킹 불러오기 실패", err);
      }
    };

    fetchData();
  }, []);

  const sorted = [...data].sort((a, b) => b.amount - a.amount);
  const topStudies = sorted.slice(0, 2).map((item) => item.study);

  return (
    <div
      style={{
        width: "100%",
        height: "50vh",
        padding: "1rem",
        // borderLeft: "1px solid #ccc",
        // borderRight: "1px solid #ccc",
        marginBottom: "2rem",
      }}
    >
      <h3
        style={{
          color: "black",
          textAlign: "center",
          marginBottom: "1rem",
          paddingTop: "4rem",
        }}
      >
        ⚠️ 지난주 스터디별 벌금순위 ⚠️
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="study" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip
            formatter={(value: number) => `${value.toLocaleString()}원`}
          />
          <Bar
            dataKey="amount"
            radius={[4, 4, 0, 0]}
            label={{ position: "top", fill: "#000", fontSize: 12 }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={topStudies.includes(entry.study) ? "#0046ff" : "#ccc"}
              />
            ))}
            <LabelList
              dataKey="amount"
              position="top"
              content={({ value }) => `₩${(value as number).toLocaleString()}`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
