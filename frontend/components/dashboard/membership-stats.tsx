"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Premium", value: 540, color: "#3b82f6" },
  { name: "Standard", value: 620, color: "#10b981" },
  { name: "Basic", value: 210, color: "#f59e0b" },
  { name: "Day Pass", value: 88, color: "#6366f1" },
]

export function MembershipStats() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} members`, "Count"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

