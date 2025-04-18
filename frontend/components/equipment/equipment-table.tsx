"use client"

import { useEffect, useState } from "react"
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
import { EquipmentType } from "@/types/Equipments"
import { useAllEquipmentsQuery } from "@/lib/user"
import { format, subDays, addDays } from 'date-fns';

function getRandomDate(start: Date = new Date(2025, 0, 1), end: Date = new Date(2027, 3, 17)) {
    const diff = end.getTime() - start.getTime();
    const randomDate = new Date(start.getTime() + Math.random() * diff);
    return format(randomDate, 'yyyy-MM-dd');
}
export function EquipmentTable() {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [sortColumn, setSortColumn] = useState<string>("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [equipment, setEquipment] = useState<EquipmentType[]>([]);
    const { data: allEquipments } = useAllEquipmentsQuery("");

    useEffect(() => {
        console.log(allEquipments);

        if (allEquipments && allEquipments.length > 0) {
            setEquipment(allEquipments);
      }
    }, [allEquipments])
    

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
                              Category
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
                              Condition
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
                  {/* @ts-ignore */}
                  <TableCell className="hidden md:table-cell">{item.serial_number}</TableCell>
                  {/* @ts-ignore */}
                  <TableCell className="pl-10">{item.category_name}</TableCell>
                  <TableCell className="hidden lg:table-cell pl-12">{getRandomDate()}</TableCell>
                  <TableCell className="pl-8 justify-center self-center">
                      <Badge
                        //   @ts-ignore
                          variant={
                              //   @ts-ignore
                              item.condition === "excellent" || item.condition === "good"
                                  ? "success"
                                  //   @ts-ignore
                                  : item.condition === "out-of-service"
                        ? "warning"
                        : "destructive"
                  }
                      >
                          {/* @ts-ignore*/}
                          {item.condition}
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

