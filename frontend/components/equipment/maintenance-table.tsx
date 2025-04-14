"use client"

import { useState } from "react"
import { ArrowUpDown, CheckCircle, Clock, MoreHorizontal, Wrench, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
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

// Sample data
const maintenanceRecords = [
  {
    id: "M001",
    equipmentId: "EQ001",
    equipmentName: "Treadmill",
    type: "Routine",
    scheduledDate: "Sep 10, 2023",
    technician: "John Davis",
    status: "Scheduled",
    notes: "Regular maintenance check",
  },
  {
    id: "M002",
    equipmentId: "EQ003",
    equipmentName: "Bench Press",
    type: "Repair",
    scheduledDate: "May 20, 2023",
    completedDate: "May 20, 2023",
    technician: "Mike Wilson",
    status: "Completed",
    notes: "Fixed loose bolts and adjusted seat",
  },
  {
    id: "M003",
    equipmentId: "EQ005",
    equipmentName: "Rowing Machine",
    type: "Emergency",
    scheduledDate: "Jul 30, 2023",
    completedDate: "Jul 30, 2023",
    technician: "Sarah Johnson",
    status: "Completed",
    notes: "Replaced broken display and calibrated resistance",
  },
  {
    id: "M004",
    equipmentId: "EQ008",
    equipmentName: "Cable Machine",
    type: "Routine",
    scheduledDate: "Oct 15, 2023",
    technician: "John Davis",
    status: "In Progress",
    notes: "Regular maintenance check",
  },
  {
    id: "M005",
    equipmentId: "EQ002",
    equipmentName: "Elliptical",
    type: "Routine",
    scheduledDate: "Oct 15, 2023",
    technician: "Mike Wilson",
    status: "Scheduled",
    notes: "Regular maintenance check",
  },
  {
    id: "M006",
    equipmentId: "EQ004",
    equipmentName: "Leg Press",
    type: "Routine",
    scheduledDate: "Dec 25, 2023",
    technician: "Sarah Johnson",
    status: "Scheduled",
    notes: "Regular maintenance check",
  },
  {
    id: "M007",
    equipmentId: "EQ006",
    equipmentName: "Stationary Bike",
    type: "Repair",
    scheduledDate: "Aug 5, 2023",
    completedDate: "Aug 5, 2023",
    technician: "John Davis",
    status: "Completed",
    notes: "Fixed resistance knob and replaced pedal straps",
  },
  {
    id: "M008",
    equipmentId: "EQ007",
    equipmentName: "Smith Machine",
    type: "Routine",
    scheduledDate: "Mar 10, 2024",
    technician: "Mike Wilson",
    status: "Scheduled",
    notes: "Regular maintenance check",
  },
  {
    id: "M009",
    equipmentId: "EQ009",
    equipmentName: "Stair Climber",
    type: "Routine",
    scheduledDate: "May 20, 2024",
    technician: "Sarah Johnson",
    status: "Scheduled",
    notes: "Regular maintenance check",
  },
  {
    id: "M010",
    equipmentId: "EQ010",
    equipmentName: "Dumbbells Set",
    type: "Inspection",
    scheduledDate: "Jun 25, 2024",
    technician: "John Davis",
    status: "Scheduled",
    notes: "Check for damage and wear",
  },
]

export function MaintenanceTable() {
  const [sortColumn, setSortColumn] = useState<string>("scheduledDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedRecords = [...maintenanceRecords].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("equipmentName")} className="flex items-center gap-1">
                Equipment
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("type")} className="flex items-center gap-1">
                Type
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("scheduledDate")} className="flex items-center gap-1">
                Scheduled Date
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">Technician</TableHead>
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
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.id}</TableCell>
              <TableCell>
                <div className="font-medium">{record.equipmentName}</div>
                <div className="text-sm text-muted-foreground">{record.equipmentId}</div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    record.type === "Routine"
                      ? "outline"
                      : record.type === "Repair"
                        ? "warning"
                        : record.type === "Emergency"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {record.type}
                </Badge>
              </TableCell>
              <TableCell>{record.scheduledDate}</TableCell>
              <TableCell className="hidden md:table-cell">{record.technician}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {record.status === "Completed" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : record.status === "In Progress" ? (
                    <Wrench className="h-4 w-4 text-amber-500" />
                  ) : record.status === "Scheduled" ? (
                    <Clock className="h-4 w-4 text-blue-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span>{record.status}</span>
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
                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
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

