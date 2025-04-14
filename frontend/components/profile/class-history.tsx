import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const classHistory = [
  {
    id: 1,
    className: "Morning Yoga",
    date: "March 28, 2023",
    time: "7:00 AM - 8:00 AM",
    instructor: {
      name: "Lisa Chen",
      image: "/placeholder.svg?height=32&width=32",
      initials: "LC",
    },
    location: "Studio 1",
    status: "Attended",
  },
  {
    id: 2,
    className: "HIIT Training",
    date: "March 25, 2023",
    time: "9:30 AM - 10:30 AM",
    instructor: {
      name: "Marcus Johnson",
      image: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
    },
    location: "Main Floor",
    status: "Attended",
  },
  {
    id: 3,
    className: "Spin Class",
    date: "March 22, 2023",
    time: "12:00 PM - 1:00 PM",
    instructor: {
      name: "Sophia Rodriguez",
      image: "/placeholder.svg?height=32&width=32",
      initials: "SR",
    },
    location: "Spin Room",
    status: "Missed",
  },
  {
    id: 4,
    className: "Pilates",
    date: "March 20, 2023",
    time: "2:30 PM - 3:30 PM",
    instructor: {
      name: "James Wilson",
      image: "/placeholder.svg?height=32&width=32",
      initials: "JW",
    },
    location: "Studio 2",
    status: "Attended",
  },
  {
    id: 5,
    className: "Evening Yoga",
    date: "March 18, 2023",
    time: "6:00 PM - 7:00 PM",
    instructor: {
      name: "Aisha Patel",
      image: "/placeholder.svg?height=32&width=32",
      initials: "AP",
    },
    location: "Studio 1",
    status: "Attended",
  },
]

export function ClassHistory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Classes</h3>
        <Badge variant="outline">5 of 12 Classes This Month</Badge>
      </div>

      <div className="space-y-4">
        {classHistory.map((classItem) => (
          <div
            key={classItem.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border"
          >
            <div className="flex items-start space-x-4">
              <Avatar className="h-10 w-10 mt-1">
                <AvatarImage src={classItem.instructor.image} alt={classItem.instructor.name} />
                <AvatarFallback>{classItem.instructor.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{classItem.className}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground mt-1 space-y-1 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {classItem.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {classItem.time}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Instructor: {classItem.instructor.name} • {classItem.location}
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-0">
              <Badge variant={classItem.status === "Attended" ? "success" : "destructive"}>{classItem.status}</Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">View All Classes</Button>
      </div>
    </div>
  )
}

