"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, UserCog } from "lucide-react"

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
const members = [
  {
    id: "M001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    membershipType: "Premium",
    status: "Active",
    joinDate: "Jan 15, 2023",
    expiryDate: "Jan 15, 2024",
    image: "/placeholder.svg?height=40&width=40",
    initials: "JS",
  },
  {
    id: "M002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 234-5678",
    membershipType: "Standard",
    status: "Active",
    joinDate: "Feb 3, 2023",
    expiryDate: "Feb 3, 2024",
    image: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
  },
  {
    id: "M003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "(555) 345-6789",
    membershipType: "Basic",
    status: "Inactive",
    joinDate: "Mar 12, 2023",
    expiryDate: "Mar 12, 2024",
    image: "/placeholder.svg?height=40&width=40",
    initials: "MB",
  },
  {
    id: "M004",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "(555) 456-7890",
    membershipType: "Premium",
    status: "Active",
    joinDate: "Apr 5, 2023",
    expiryDate: "Apr 5, 2024",
    image: "/placeholder.svg?height=40&width=40",
    initials: "ED",
  },
  {
    id: "M005",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "(555) 567-8901",
    membershipType: "Standard",
    status: "Expired",
    joinDate: "May 20, 2023",
    expiryDate: "Nov 20, 2023",
    image: "/placeholder.svg?height=40&width=40",
    initials: "DW",
  },
  {
    id: "M006",
    name: "Jessica Martinez",
    email: "jessica.m@example.com",
    phone: "(555) 678-9012",
    membershipType: "Premium",
    status: "Active",
    joinDate: "Jun 8, 2023",
    expiryDate: "Jun 8, 2024",
    image: "/placeholder.svg?height=40&width=40",
    initials: "JM",
  },
  {
    id: "M007",
    name: "Robert Taylor",
    email: "robert.t@example.com",
    phone: "(555) 789-0123",
    membershipType: "Basic",
    status: "Active",
    joinDate: "Jul 17, 2023",
    expiryDate: "Jul 17, 2024",
    image: "/placeholder.svg?height=40&width=40",
    initials: "RT",
  },
  {
    id: "M008",
    name: "Jennifer Anderson",
    email: "jennifer.a@example.com",
    phone: "(555) 890-1234",
    membershipType: "Standard",
    status: "Active",
    joinDate: "Aug 22, 2023",
    expiryDate: "Aug 22, 2024",
    image: "/placeholder.svg?height=40&width=40",
    initials: "JA",
  },
  {
    id: "M009",
    name: "Christopher Lee",
    email: "chris.l@example.com",
    phone: "(555) 901-2345",
    membershipType: "Premium",
    status: "Inactive",
    joinDate: "Sep 10, 2023",
    expiryDate: "Sep 10, 2024",
    image: "/placeholder.svg?height=40&width=40",
    initials: "CL",
  },
  {
    id: "M010",
    name: "Amanda White",
    email: "amanda.w@example.com",
    phone: "(555) 012-3456",
    membershipType: "Basic",
    status: "Active",
    joinDate: "Oct 5, 2023",
    expiryDate: "Oct 5, 2024",
    image: "/placeholder.svg?height=40&width=40",
    initials: "AW",
  },
]

export function MembersTable() {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
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

  const sortedMembers = [...members].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const toggleSelectAll = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(members.map((member) => member.id))
    }
  }

  const toggleSelectMember = (id: string) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((memberId) => memberId !== id))
    } else {
      setSelectedMembers([...selectedMembers, id])
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedMembers.length === members.length && members.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all members"
              />
            </TableHead>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("name")} className="flex items-center gap-1">
                Name
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden lg:table-cell">Phone</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("membershipType")} className="flex items-center gap-1">
                Membership
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("status")} className="flex items-center gap-1">
                Status
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden lg:table-cell">
              <Button variant="ghost" onClick={() => toggleSort("expiryDate")} className="flex items-center gap-1">
                Expiry Date
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMembers.map((member) => (
            <TableRow key={member.id} className={selectedMembers.includes(member.id) ? "bg-muted/50" : undefined}>
              <TableCell>
                <Checkbox
                  checked={selectedMembers.includes(member.id)}
                  onCheckedChange={() => toggleSelectMember(member.id)}
                  aria-label={`Select ${member.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">{member.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <span>{member.name}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{member.email}</TableCell>
              <TableCell className="hidden lg:table-cell">{member.phone}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    member.membershipType === "Premium"
                      ? "default"
                      : member.membershipType === "Standard"
                        ? "outline"
                        : "secondary"
                  }
                >
                  {member.membershipType}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    member.status === "Active" ? "success" : member.status === "Inactive" ? "warning" : "destructive"
                  }
                >
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">{member.expiryDate}</TableCell>
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
                      <Link href={`/members/${member.id}`}>
                        <UserCog className="mr-2 h-4 w-4" />
                        View Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/members/${member.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Member
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Member
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

