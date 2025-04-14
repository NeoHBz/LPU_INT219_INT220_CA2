"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const weeklyData = [
  { name: "Monday", checkIns: 145, classes: 42 },
  { name: "Tuesday", checkIns: 139, classes: 38 },
  { name: "Wednesday", checkIns: 162, classes: 45 },
  { name: "Thursday", checkIns: 178, classes: 48 },
  { name: "Friday", checkIns: 184, classes: 52 },
  { name: "Saturday", checkIns: 191, classes: 56 },
  { name: "Sunday", checkIns: 152, classes: 44 },
]

export function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={weeklyData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Legend />
        <Bar dataKey="checkIns" name="Check-ins" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="classes" name="Class Attendance" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

