// components/ProgressDonutChart.tsx
"use client";

import { PieChart, Pie, Cell } from "recharts";

interface DonutChartProps {
    currentWeek: number;
    totalWeek: number;
}

export default function ProgressDonutChart({ currentWeek, totalWeek }: DonutChartProps) {
    const data = [
        { name: "진행", value: currentWeek },
        { name: "남음", value: totalWeek - currentWeek },
    ];

    const COLORS = ["#4F46E5", "#E5E7EB"]; // 진척도 / 회색

    const percent = Math.round((currentWeek / totalWeek) * 100);

    return (
        <div className="relative w-[120px] h-[120px] mx-auto">
            <PieChart width={120} height={120}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={55}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                >
                    {data.map((_, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
                    ))}
                </Pie>
            </PieChart>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">{percent}%</span>
            </div>
        </div>
    );
}
