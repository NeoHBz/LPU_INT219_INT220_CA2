"use client"

import { useState } from "react"
import { ArrowUpDown, CheckCircle, Clock, MoreHorizontal, XCircle } from "lucide-react"

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
const attendanceRecords = [
  {
    id: "A001",
    memberId: "M001",
    memberName: "John Smith",
    memberImage: "/placeholder.svg?height=40&width=40",
    memberInitials: "JS",
    checkInTime: "07:15 AM",
    checkOutTime: "08:45 AM",
    duration: "1h 30m",
    status: "Completed",
    membershipType: "Premium",
  },
  {
    id: "A002",
    memberId: "M002",
    memberName: "Sarah Johnson",
    memberImage: "/placeholder.svg?height=40&width=40",
    memberInitials: "SJ",
    checkInTime: "08:30 AM",
    checkOutTime: "10:15 AM",
    duration: "1h 45m",
    status: "Completed",
    membershipType: "Standard",
  },
  {
    id: "A003",
    memberId: "M004",
    memberName: "Emily Davis",
    memberImage: "/placeholder.svg?height=40&width=40",
    memberInitials: "ED",
    checkInTime: "09:45 AM",
    status: "Active",
    membershipType: "Premium",
  },
  {
    id: "A004",
    memberId: "M006",
    memberName: "Jessica Martinez",
    memberImage: "/placeholder.svg?height=40&width=40",
    memberInitials: "JM",
    checkInTime: "10:30 AM",
    checkOutTime: "12:15 PM",
    duration: "1h 45m",
    status: "Completed",
    membershipType: "Premium",
  },
  {
    id: "A005",
    memberId: "M007",
    memberName: "Robert Taylor",
    memberImage: "/placeholder.svg?height=40&width=40",
    memberInitials: "RT",
    checkInTime: "11:00 AM",
    status: "Active",
    membershipType: "Basic",
  },
  {
    id: "A006",
    memberId: "M008",
    memberName: "Jennifer Anderson",
    memberImage: "/placeholder.svg?height=40&width=40",
    memberInitials: "JA",
    checkInTime: "12:30 PM",
    checkOutTime: "02:00 PM",
    duration: "1h 30m",
    status: "Completed",
    membershipType: "Standard",
  },
  {
    id: "A007",
    memberId: "M010",
    memberName: "Amanda White",
    memberImage: "/placeholder.svg?height=40&width=40",
    memberInitials: "AW",
    checkInTime: "01:15 PM",
    status: "Active",
    membershipType: "Basic",
  },
  {
    id: "A008",
    memberId: "M003",
    memberName: "Michael Brown",
    memberImage: "/placeholder.svg?height=40&width=40",
    memberInitials: "MB",
    checkInTime: "02:30 PM",
    status: "No Show",
    membershipType: "Basic",
  },
  {
    id: "A009",
    memberId: "M005",
    memberName: "David Wilson",
    memberImage: "/placeholder.svg?height=40&width=40",
    memberInitials: "DW",
    checkInTime: "03:45 PM",
    status: "No Show",
    membershipType: "Standard",
  },
  {
    id: "A010",
    memberId: "M009",
    memberName: "Christopher Lee",
    memberImage: "/placeholder.svg?height=40&width=40",
    memberInitials: "CL",
    checkInTime: "05:00 PM",
    status: "Active",
    membershipType: "Premium",
  },
]

export function AttendanceTable() {
  const [selectedRecords, setSelectedRecords] = useState<string[]>([])
  const [sortColumn, setSortColumn] = useState<string>("checkInTime")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedRecords = [...attendanceRecords].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const toggleSelectAll = () => {
    if (selectedRecords.length === attendanceRecords.length) {
      setSelectedRecords([])
    } else {
      setSelectedRecords(attendanceRecords.map((record) => record.id))
    }
  }

  const toggleSelectRecord = (id: string) => {
    if (selectedRecords.includes(id)) {
      setSelectedRecords(selectedRecords.filter((recordId) => recordId !== id))
    } else {
      setSelectedRecords([...selectedRecords, id])
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRecords.length === attendanceRecords.length && attendanceRecords.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all records"
              />
            </TableHead>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("memberName")} className="flex items-center gap-1">
                Member
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("checkInTime")} className="flex items-center gap-1">
                Check In
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Button variant="ghost" onClick={() => toggleSort("checkOutTime")} className="flex items-center gap-1">
                Check Out
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden lg:table-cell">Duration</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("status")} className="flex items-center gap-1">
                Status
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRecords.map((record) => (
            <TableRow key={record.id} className={selectedRecords.includes(record.id) ? "bg-muted/50" : undefined}>
              <TableCell>
                <Checkbox
                  checked={selectedRecords.includes(record.id)}
                  onCheckedChange={() => toggleSelectRecord(record.id)}
                  aria-label={`Select ${record.memberName}`}
                />
              </TableCell>
              <TableCell className="font-medium">{record.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={record.memberImage} alt={record.memberName} />
                    <AvatarFallback>{record.memberInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{record.memberName}</div>
                    <div className="text-xs text-muted-foreground">
                      {record.memberId} · {record.membershipType}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{record.checkInTime}</TableCell>
              <TableCell className="hidden md:table-cell">{record.checkOutTime || "-"}</TableCell>
              <TableCell className="hidden lg:table-cell">{record.duration || "-"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {record.status === "Completed" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : record.status === "Active" ? (
                    <Clock className="h-4 w-4 text-blue-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <Badge
                    variant={
                      record.status === "Completed" ? "success" : record.status === "Active" ? "outline" : "destructive"
                    }
                  >
                    {record.status}
                  </Badge>
                </div>
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
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Record</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Manual Check Out</DropdownMenuItem>
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

