// src/components/SpendingCharts.js
import React from "react";
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";

const CATEGORY_COLORS = [
  "#6366f1", "#3b82f6", "#06b6d4", "#fbbf24", "#ff9500", "#a21caf", "#ef4444",
];

export default function SpendingCharts({ transactions }) {
  // Pie chart data
  const pieData = Object.values(
    transactions.reduce((acc, curr) => {
      const key = curr.category || "Other";
      acc[key] = acc[key] || { name: key, value: 0 };
      acc[key].value += Math.abs(Number(curr.amount));
      return acc;
    }, {})
  );

  // Line chart data (sorted)
  const chartData = transactions
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(tx => ({
      date: tx.date,
      amount: tx.amount
    }));

  return (
    <>
      <div className="bg-[#141a2a] rounded-xl p-6 mb-8 shadow-lg border-b-4 border-orange-400">
        <h2 className="text-2xl font-bold mb-4 text-indigo-300">Spending Over Time</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="indigoBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                <stop offset="90%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="#a5b4fc" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366f1"
              strokeWidth={4}
              fill="url(#indigoBlue)"
              dot={{ r: 7, stroke: "#2563eb", fill: "#fff" }}
              activeDot={{ r: 10, fill: "#ff9500" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-[#141a2a] rounded-xl p-6 mb-8 shadow-lg border-l-4 border-orange-400">
        <h2 className="text-2xl font-bold mb-4 text-indigo-300">Spending by Category</h2>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              label={({ name, value }) => `${name}: ₹${value}`}
              labelLine={false}
              isAnimationActive={true}
            >
              {pieData.map((_, idx) => (
                <Cell key={idx} fill={CATEGORY_COLORS[idx % CATEGORY_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
