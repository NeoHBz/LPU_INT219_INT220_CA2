"use client"

import { useEffect, useState } from "react"
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
import { MemberType } from "@/types/Members"
import { useAllMembersQuery } from "@/lib/user"

export function MembersTable() {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [sortColumn, setSortColumn] = useState<string>("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [members, setMembers] = useState<MemberType[]>([]);
    const { data: membersData, isError } = useAllMembersQuery("");

    useEffect(() => {
        console.log("Members Data: ", membersData);
        if(membersData && membersData.length > 0) {
            setMembers(membersData);
        }
    }, [membersData]);
    
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
                      {/* <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("status")} className="flex items-center gap-1">
                Status
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead> */}
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
                  {members.map((member) => (
            <TableRow key={member.id} className={selectedMembers.includes(member.id) ? "bg-muted/50" : undefined}>
              <TableCell>
                <Checkbox
                  checked={selectedMembers.includes(member.id)}
                  onCheckedChange={() => toggleSelectMember(member.id)}
                                  aria-label={`Select ${member.user.username}`}
                />
              </TableCell>
              <TableCell className="font-medium">{member.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                                      <AvatarImage src={member.image} alt={member.user.first_name + " " + member.user.last_name} />
                                      <AvatarFallback>{member.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                                  <span>{member.user.first_name + " " + member.user.last_name}</span>
                </div>
              </TableCell>
                          <TableCell className="hidden md:table-cell">{member.user.email}</TableCell>
                          <TableCell className="hidden lg:table-cell">{member.user.phone_number}</TableCell>
              <TableCell>
                              <Badge 
                  variant={
                                      member.plan.membership_type === "Premium"
                      ? "default"
                                          : member.plan.membership_type === "Standard"
                        ? "outline"
                        : "secondary"
                  }
                >
                                  {member.plan.membership_type.toUpperCase()}
                </Badge>
              </TableCell>
                          {/* <TableCell>
                <Badge
                  variant={
                    member.status === "Active" ? "default" : member.status === "Inactive" ? "outline" : "destructive"
                  }
                >
                  {member.status}
                </Badge>
              </TableCell> */}
                          <TableCell className="hidden lg:table-cell">{member.expiry_date.split(" ")[0]}</TableCell>
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

