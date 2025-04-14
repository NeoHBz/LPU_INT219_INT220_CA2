"use client"

import type { membershipStats } from "@/types/membership-stats"
import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function MembershipStats() {
    const [data, setData] = useState<membershipStats[]>([])
    
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/membership-stats`).then((res) => res.json()).then((data) => {
            setData(data)

        })
    },[])
    
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

