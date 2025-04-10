import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { UpcomingClasses } from "@/types/UpcomingClasses"
import { useEffect, useState } from "react"

// const classes = [
//   {
//     id: 1,
//     name: "Morning Yoga",
//     time: "7:00 AM - 8:00 AM",
//     instructor: {
//       name: "Lisa Chen",
//       image: "/placeholder.svg?height=32&width=32",
//       initials: "LC",
//     },
//     location: "Studio 1",
//     attendees: 12,
//     capacity: 20,
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "HIIT Training",
//     time: "9:30 AM - 10:30 AM",
//     instructor: {
//       name: "Marcus Johnson",
//       image: "/placeholder.svg?height=32&width=32",
//       initials: "MJ",
//     },
//     location: "Main Floor",
//     attendees: 18,
//     capacity: 20,
//     status: "Almost Full",
//   },
//   {
//     id: 3,
//     name: "Spin Class",
//     time: "12:00 PM - 1:00 PM",
//     instructor: {
//       name: "Sophia Rodriguez",
//       image: "/placeholder.svg?height=32&width=32",
//       initials: "SR",
//     },
//     location: "Spin Room",
//     attendees: 20,
//     capacity: 20,
//     status: "Full",
//   },
//   {
//     id: 4,
//     name: "Pilates",
//     time: "2:30 PM - 3:30 PM",
//     instructor: {
//       name: "James Wilson",
//       image: "/placeholder.svg?height=32&width=32",
//       initials: "JW",
//     },
//     location: "Studio 2",
//     attendees: 8,
//     capacity: 15,
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "Evening Yoga",
//     time: "6:00 PM - 7:00 PM",
//     instructor: {
//       name: "Aisha Patel",
//       image: "/placeholder.svg?height=32&width=32",
//       initials: "AP",
//     },
//     location: "Studio 1",
//     attendees: 14,
//     capacity: 20,
//     status: "Active",
//   },
// ]

export function UpcomingClasses() {
    const [classes, setClasses] = useState<UpcomingClasses[]>([]);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upcoming-classes`, {
            method: "GET"
        }).then((res) => res.json()).then((data) =>  setClasses(data) );
    }, [])
    

  return (
    <div className="space-y-8">
      {classes.map((classItem) => (
        <div key={classItem.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={classItem.instructor.image} alt={classItem.instructor.name} />
            <AvatarFallback>{classItem.instructor.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{classItem.name}</p>
            <p className="text-sm text-muted-foreground">
              {classItem.time} - {classItem.location}
            </p>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <Badge
              variant={
                classItem.status === "Full" ? "destructive" : classItem.status === "Almost Full" ? "secondary" : "outline"
              }
              className="ml-auto"
            >
              {classItem.attendees}/{classItem.capacity}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

