"use client"

import { useEffect, useState } from "react"
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
import { MaintainaceEquipmentType } from "@/types/Equipments"
import { useMaintainanceEquipmentsQuery } from "@/lib/user"



export function MaintenanceTable() {
    const [sortColumn, setSortColumn] = useState<string>("scheduledDate");
    const [maintenanceRecords, setMaintenanceRecords] = useState<MaintainaceEquipmentType[]>([]);
    const { data: maintainanceEquipment } = useMaintainanceEquipmentsQuery("");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    useEffect(() => {
        if (maintainanceEquipment && maintainanceEquipment.length > 0) {
            setMaintenanceRecords(maintainanceEquipment);
        }
    }, [maintainanceEquipment])
    

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
                        //   @ts-ignore
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

