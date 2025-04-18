"use client"

import { Attendance } from "@/types/Attendance"
import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"


export function AttendanceChart() {
    const [data, setData] = useState<Attendance[]>([])
        useEffect(() => {
            fetch(`http://localhost:9876/api/attendance`, {
                method: "GET"
            }).then((res) => res.json()).then((data) => { console.log(data); setData(data.attendance) });
      
    }, [])

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
        </ResponsiveContainer>
    )
}

