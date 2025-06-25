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
} from "recharts";
import { Cell } from "recharts";

type StudyPenalty = {
  study: string;
  amount: number;
};

interface Props {
  data: StudyPenalty[];
}

export default function PenaltyBarChart({ data }: Props) {
  // 상위 2개 골라서 색상 지정
  const sorted = [...data].sort((a, b) => b.amount - a.amount);
  const topStudies = sorted.slice(0, 2).map((item) => item.study);

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        padding: "1rem",
      }}
    >
      <h3 style={{ color: "white", textAlign: "center", marginBottom: "1rem" }}>
        각 스터디별 벌금랭킹 ⚠️
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="study" stroke="#fff" />
          <YAxis stroke="#fff" />
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
                fill={topStudies.includes(entry.study) ? "#FFD700" : "#ccc"} // 노랑 or 회색
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
