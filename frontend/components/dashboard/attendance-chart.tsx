"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "1", total: 145 },
  { name: "2", total: 139 },
  { name: "3", total: 162 },
  { name: "4", total: 178 },
  { name: "5", total: 184 },
  { name: "6", total: 191 },
  { name: "7", total: 152 },
  { name: "8", total: 148 },
  { name: "9", total: 156 },
  { name: "10", total: 162 },
  { name: "11", total: 175 },
  { name: "12", total: 183 },
  { name: "13", total: 187 },
  { name: "14", total: 156 },
  { name: "15", total: 149 },
  { name: "16", total: 152 },
  { name: "17", total: 163 },
  { name: "18", total: 172 },
  { name: "19", total: 180 },
  { name: "20", total: 189 },
  { name: "21", total: 158 },
  { name: "22", total: 145 },
  { name: "23", total: 151 },
  { name: "24", total: 164 },
  { name: "25", total: 171 },
  { name: "26", total: 179 },
  { name: "27", total: 185 },
  { name: "28", total: 154 },
  { name: "29", total: 146 },
  { name: "30", total: 150 },
]

export function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

