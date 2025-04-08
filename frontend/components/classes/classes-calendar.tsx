"use client"

import * as React from "react"
import { addDays, format, startOfWeek, addWeeks, subWeeks } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Sample data - simplified for calendar view
const classSchedule = [
  {
    id: "C001",
    name: "Morning Yoga",
    instructor: {
      name: "Lisa Chen",
      image: "/placeholder.svg?height=32&width=32",
      initials: "LC",
    },
    time: "7:00 AM - 8:00 AM",
    location: "Studio 1",
    days: [1, 3, 5], // Monday, Wednesday, Friday
    color: "bg-blue-100 border-blue-300 text-blue-700",
  },
  {
    id: "C002",
    name: "HIIT Training",
    instructor: {
      name: "Marcus Johnson",
      image: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
    },
    time: "9:30 AM - 10:30 AM",
    location: "Main Floor",
    days: [2, 4], // Tuesday, Thursday
    color: "bg-red-100 border-red-300 text-red-700",
  },
  {
    id: "C003",
    name: "Spin Class",
    instructor: {
      name: "Sophia Rodriguez",
      image: "/placeholder.svg?height=32&width=32",
      initials: "SR",
    },
    time: "12:00 PM - 1:00 PM",
    location: "Spin Room",
    days: [1, 3, 5], // Monday, Wednesday, Friday
    color: "bg-green-100 border-green-300 text-green-700",
  },
  {
    id: "C004",
    name: "Pilates",
    instructor: {
      name: "James Wilson",
      image: "/placeholder.svg?height=32&width=32",
      initials: "JW",
    },
    time: "2:30 PM - 3:30 PM",
    location: "Studio 2",
    days: [2, 4], // Tuesday, Thursday
    color: "bg-purple-100 border-purple-300 text-purple-700",
  },
  {
    id: "C005",
    name: "Evening Yoga",
    instructor: {
      name: "Aisha Patel",
      image: "/placeholder.svg?height=32&width=32",
      initials: "AP",
    },
    time: "6:00 PM - 7:00 PM",
    location: "Studio 1",
    days: [1, 3, 5], // Monday, Wednesday, Friday
    color: "bg-indigo-100 border-indigo-300 text-indigo-700",
  },
  {
    id: "C006",
    name: "Strength Training",
    instructor: {
      name: "David Kim",
      image: "/placeholder.svg?height=32&width=32",
      initials: "DK",
    },
    time: "5:00 PM - 6:00 PM",
    location: "Weight Room",
    days: [2, 4, 6], // Tuesday, Thursday, Saturday
    color: "bg-yellow-100 border-yellow-300 text-yellow-700",
  },
  {
    id: "C007",
    name: "Zumba",
    instructor: {
      name: "Maria Lopez",
      image: "/placeholder.svg?height=32&width=32",
      initials: "ML",
    },
    time: "7:30 PM - 8:30 PM",
    location: "Studio 3",
    days: [1, 3], // Monday, Wednesday
    color: "bg-pink-100 border-pink-300 text-pink-700",
  },
]

export function ClassesCalendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }) // Start from Monday

  const nextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1))
  }

  const prevWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1))
  }

  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

  const getClassesForDay = (dayIndex: number) => {
    // Convert from 0-based (Sunday = 0) to 1-based (Monday = 1)
    const adjustedDayIndex = dayIndex === 0 ? 7 : dayIndex
    return classSchedule.filter((cls) => cls.days.includes(adjustedDayIndex))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          {format(startDate, "MMMM d, yyyy")} - {format(addDays(startDate, 6), "MMMM d, yyyy")}
        </h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous week</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next week</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={index} className="text-center">
            <div className="mb-1 font-medium">{format(day, "EEE")}</div>
            <div
              className={`rounded-md p-1 text-sm ${format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? "bg-primary/10" : ""}`}
            >
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, dayIndex) => {
          const dayClasses = getClassesForDay(day.getDay())
          return (
            <div key={dayIndex} className="min-h-[200px] rounded-md border p-2">
              {dayClasses.length === 0 ? (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No classes</div>
              ) : (
                <div className="space-y-2">
                  {dayClasses.map((cls) => (
                    <Card key={cls.id} className={`cursor-pointer border ${cls.color}`}>
                      <CardContent className="p-2">
                        <div className="text-sm font-medium">{cls.name}</div>
                        <div className="flex items-center gap-1 text-xs">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={cls.instructor.image} alt={cls.instructor.name} />
                            <AvatarFallback className="text-[10px]">{cls.instructor.initials}</AvatarFallback>
                          </Avatar>
                          {cls.instructor.name}
                        </div>
                        <div className="mt-1 text-xs">{cls.time}</div>
                        <div className="mt-1 flex justify-between text-xs">
                          <span>{cls.location}</span>
                          <Badge variant="outline" className="text-[10px]">
                            View
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

