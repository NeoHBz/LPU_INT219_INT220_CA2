"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, Calendar, Clock, Edit, MoreHorizontal, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data
const classes = [
  {
    id: "C001",
    name: "Morning Yoga",
    type: "Yoga",
    instructor: {
      name: "Lisa Chen",
      image: "/placeholder.svg?height=40&width=40",
      initials: "LC",
    },
    schedule: "Mon, Wed, Fri",
    time: "7:00 AM - 8:00 AM",
    location: "Studio 1",
    capacity: 20,
    enrolled: 12,
    status: "Active",
  },
  {
    id: "C002",
    name: "HIIT Training",
    type: "Cardio",
    instructor: {
      name: "Marcus Johnson",
      image: "/placeholder.svg?height=40&width=40",
      initials: "MJ",
    },
    schedule: "Tue, Thu",
    time: "9:30 AM - 10:30 AM",
    location: "Main Floor",
    capacity: 20,
    enrolled: 18,
    status: "Active",
  },
  {
    id: "C003",
    name: "Spin Class",
    type: "Cardio",
    instructor: {
      name: "Sophia Rodriguez",
      image: "/placeholder.svg?height=40&width=40",
      initials: "SR",
    },
    schedule: "Mon, Wed, Fri",
    time: "12:00 PM - 1:00 PM",
    location: "Spin Room",
    capacity: 20,
    enrolled: 20,
    status: "Full",
  },
  {
    id: "C004",
    name: "Pilates",
    type: "Core",
    instructor: {
      name: "James Wilson",
      image: "/placeholder.svg?height=40&width=40",
      initials: "JW",
    },
    schedule: "Tue, Thu",
    time: "2:30 PM - 3:30 PM",
    location: "Studio 2",
    capacity: 15,
    enrolled: 8,
    status: "Active",
  },
  {
    id: "C005",
    name: "Evening Yoga",
    type: "Yoga",
    instructor: {
      name: "Aisha Patel",
      image: "/placeholder.svg?height=40&width=40",
      initials: "AP",
    },
    schedule: "Mon, Wed, Fri",
    time: "6:00 PM - 7:00 PM",
    location: "Studio 1",
    capacity: 20,
    enrolled: 14,
    status: "Active",
  },
  {
    id: "C006",
    name: "Strength Training",
    type: "Strength",
    instructor: {
      name: "David Kim",
      image: "/placeholder.svg?height=40&width=40",
      initials: "DK",
    },
    schedule: "Tue, Thu, Sat",
    time: "5:00 PM - 6:00 PM",
    location: "Weight Room",
    capacity: 12,
    enrolled: 10,
    status: "Active",
  },
  {
    id: "C007",
    name: "Zumba",
    type: "Dance",
    instructor: {
      name: "Maria Lopez",
      image: "/placeholder.svg?height=40&width=40",
      initials: "ML",
    },
    schedule: "Mon, Wed",
    time: "7:30 PM - 8:30 PM",
    location: "Studio 3",
    capacity: 25,
    enrolled: 22,
    status: "Active",
  },
  {
    id: "C008",
    name: "CrossFit",
    type: "Strength",
    instructor: {
      name: "Ryan Thompson",
      image: "/placeholder.svg?height=40&width=40",
      initials: "RT",
    },
    schedule: "Mon, Wed, Fri",
    time: "6:00 AM - 7:00 AM",
    location: "CrossFit Area",
    capacity: 15,
    enrolled: 15,
    status: "Full",
  },
  {
    id: "C009",
    name: "Kickboxing",
    type: "Martial Arts",
    instructor: {
      name: "Jason Lee",
      image: "/placeholder.svg?height=40&width=40",
      initials: "JL",
    },
    schedule: "Tue, Thu",
    time: "7:00 PM - 8:00 PM",
    location: "Studio 2",
    capacity: 18,
    enrolled: 12,
    status: "Active",
  },
  {
    id: "C010",
    name: "Meditation",
    type: "Mind & Body",
    instructor: {
      name: "Emma Wilson",
      image: "/placeholder.svg?height=40&width=40",
      initials: "EW",
    },
    schedule: "Sat, Sun",
    time: "9:00 AM - 10:00 AM",
    location: "Wellness Room",
    capacity: 20,
    enrolled: 8,
    status: "Active",
  },
]

export function ClassesTable() {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [sortColumn, setSortColumn] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedClasses = [...classes].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const toggleSelectAll = () => {
    if (selectedClasses.length === classes.length) {
      setSelectedClasses([])
    } else {
      setSelectedClasses(classes.map((cls) => cls.id))
    }
  }

  const toggleSelectClass = (id: string) => {
    if (selectedClasses.includes(id)) {
      setSelectedClasses(selectedClasses.filter((classId) => classId !== id))
    } else {
      setSelectedClasses([...selectedClasses, id])
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedClasses.length === classes.length && classes.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all classes"
              />
            </TableHead>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("name")} className="flex items-center gap-1">
                Class Name
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Button variant="ghost" onClick={() => toggleSort("type")} className="flex items-center gap-1">
                Type
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead className="hidden lg:table-cell">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Schedule
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Time
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Capacity
              </div>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedClasses.map((classItem) => (
            <TableRow key={classItem.id} className={selectedClasses.includes(classItem.id) ? "bg-muted/50" : undefined}>
              <TableCell>
                <Checkbox
                  checked={selectedClasses.includes(classItem.id)}
                  onCheckedChange={() => toggleSelectClass(classItem.id)}
                  aria-label={`Select ${classItem.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">{classItem.id}</TableCell>
              <TableCell>
                <div className="font-medium">{classItem.name}</div>
                <div className="text-sm text-muted-foreground md:hidden">{classItem.type}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{classItem.type}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={classItem.instructor.image} alt={classItem.instructor.name} />
                    <AvatarFallback>{classItem.instructor.initials}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{classItem.instructor.name}</span>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">{classItem.schedule}</TableCell>
              <TableCell className="hidden md:table-cell">{classItem.time}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    classItem.enrolled === classItem.capacity
                      ? "destructive"
                      : classItem.enrolled / classItem.capacity > 0.8
                        ? "warning"
                        : "success"
                  }
                >
                  {classItem.enrolled}/{classItem.capacity}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/classes/${classItem.id}`}>
                        <Calendar className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/classes/${classItem.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Class
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Cancel Class
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

