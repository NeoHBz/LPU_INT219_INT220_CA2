"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, Calendar, Edit, MoreHorizontal, Trash2, Wrench } from "lucide-react"

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

// Sample data
const equipment = [
  {
    id: "EQ001",
    name: "Treadmill",
    model: "LifeFitness T5",
    serialNumber: "LFT5-12345",
    location: "Cardio Area",
    purchaseDate: "Jan 15, 2022",
    lastMaintenance: "Mar 10, 2023",
    nextMaintenance: "Sep 10, 2023",
    status: "Operational",
    usageHours: 1245,
  },
  {
    id: "EQ002",
    name: "Elliptical",
    model: "Precor EFX 885",
    serialNumber: "PEFX-23456",
    location: "Cardio Area",
    purchaseDate: "Feb 20, 2022",
    lastMaintenance: "Apr 15, 2023",
    nextMaintenance: "Oct 15, 2023",
    status: "Operational",
    usageHours: 980,
  },
  {
    id: "EQ003",
    name: "Bench Press",
    model: "Hammer Strength",
    serialNumber: "HSBC-34567",
    location: "Weight Area",
    purchaseDate: "Mar 5, 2022",
    lastMaintenance: "May 20, 2023",
    nextMaintenance: "Nov 20, 2023",
    status: "Under Maintenance",
    usageHours: 1560,
  },
  {
    id: "EQ004",
    name: "Leg Press",
    model: "Cybex Eagle",
    serialNumber: "CELP-45678",
    location: "Weight Area",
    purchaseDate: "Apr 10, 2022",
    lastMaintenance: "Jun 25, 2023",
    nextMaintenance: "Dec 25, 2023",
    status: "Operational",
    usageHours: 1320,
  },
  {
    id: "EQ005",
    name: "Rowing Machine",
    model: "Concept2 Model D",
    serialNumber: "C2MD-56789",
    location: "Cardio Area",
    purchaseDate: "May 15, 2022",
    lastMaintenance: "Jul 30, 2023",
    nextMaintenance: "Jan 30, 2024",
    status: "Out of Order",
    usageHours: 890,
  },
  {
    id: "EQ006",
    name: "Stationary Bike",
    model: "Keiser M3i",
    serialNumber: "KM3I-67890",
    location: "Spin Room",
    purchaseDate: "Jun 20, 2022",
    lastMaintenance: "Aug 5, 2023",
    nextMaintenance: "Feb 5, 2024",
    status: "Operational",
    usageHours: 1450,
  },
  {
    id: "EQ007",
    name: "Smith Machine",
    model: "Matrix Magnum",
    serialNumber: "MMSM-78901",
    location: "Weight Area",
    purchaseDate: "Jul 25, 2022",
    lastMaintenance: "Sep 10, 2023",
    nextMaintenance: "Mar 10, 2024",
    status: "Operational",
    usageHours: 1100,
  },
  {
    id: "EQ008",
    name: "Cable Machine",
    model: "Life Fitness Signature",
    serialNumber: "LFSC-89012",
    location: "Weight Area",
    purchaseDate: "Aug 30, 2022",
    lastMaintenance: "Oct 15, 2023",
    nextMaintenance: "Apr 15, 2024",
    status: "Under Maintenance",
    usageHours: 1280,
  },
  {
    id: "EQ009",
    name: "Stair Climber",
    model: "StairMaster 8",
    serialNumber: "SM8-90123",
    location: "Cardio Area",
    purchaseDate: "Sep 5, 2022",
    lastMaintenance: "Nov 20, 2023",
    nextMaintenance: "May 20, 2024",
    status: "Operational",
    usageHours: 950,
  },
  {
    id: "EQ010",
    name: "Dumbbells Set",
    model: "Rogue Rubber Hex",
    serialNumber: "RRHD-01234",
    location: "Free Weights Area",
    purchaseDate: "Oct 10, 2022",
    lastMaintenance: "Dec 25, 2023",
    nextMaintenance: "Jun 25, 2024",
    status: "Operational",
    usageHours: 1800,
  },
]

export function EquipmentTable() {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
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

  const sortedEquipment = [...equipment].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const toggleSelectAll = () => {
    if (selectedEquipment.length === equipment.length) {
      setSelectedEquipment([])
    } else {
      setSelectedEquipment(equipment.map((item) => item.id))
    }
  }

  const toggleSelectEquipment = (id: string) => {
    if (selectedEquipment.includes(id)) {
      setSelectedEquipment(selectedEquipment.filter((itemId) => itemId !== id))
    } else {
      setSelectedEquipment([...selectedEquipment, id])
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedEquipment.length === equipment.length && equipment.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all equipment"
              />
            </TableHead>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("name")} className="flex items-center gap-1">
                Name
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">Model</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("location")} className="flex items-center gap-1">
                Location
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden lg:table-cell">
              <Button variant="ghost" onClick={() => toggleSort("nextMaintenance")} className="flex items-center gap-1">
                Next Maintenance
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
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
          {sortedEquipment.map((item) => (
            <TableRow key={item.id} className={selectedEquipment.includes(item.id) ? "bg-muted/50" : undefined}>
              <TableCell>
                <Checkbox
                  checked={selectedEquipment.includes(item.id)}
                  onCheckedChange={() => toggleSelectEquipment(item.id)}
                  aria-label={`Select ${item.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground md:hidden">{item.model}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{item.model}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell className="hidden lg:table-cell">{item.nextMaintenance}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.status === "Operational"
                      ? "success"
                      : item.status === "Under Maintenance"
                        ? "warning"
                        : "destructive"
                  }
                >
                  {item.status}
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
                      <Link href={`/equipment/${item.id}`}>
                        <Calendar className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/equipment/${item.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Equipment
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrench className="mr-2 h-4 w-4" />
                      Schedule Maintenance
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Equipment
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

