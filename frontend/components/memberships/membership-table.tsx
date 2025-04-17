"use client"

import { useEffect, useState } from "react"
import { ArrowUpDown, Calendar, CreditCard, MoreHorizontal, Pencil, RefreshCw } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MemberShipSubscribers } from "@/types/Membership"
import { useMembershipSubscribersQuery } from "@/lib/user"

// Sample data
// const memberships = 

export function MembershipTable() {
    const [memberships, setMemberships] = useState<MemberShipSubscribers[]>([]);
  const [sortColumn, setSortColumn] = useState<string>("startDate")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
    const { data: Subscribers } = useMembershipSubscribersQuery("");
    useEffect(() => {
        if (Subscribers && Subscribers.length > 0) {
            setMemberships(Subscribers);
        }
    }, [Subscribers])
    
    

  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedMemberships = [...memberships].sort((a, b) => {
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
              <Button variant="ghost" onClick={() => toggleSort("member.name")} className="flex items-center gap-1">
                Member
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("plan")} className="flex items-center gap-1">
                Plan
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Button variant="ghost" onClick={() => toggleSort("startDate")} className="flex items-center gap-1">
                Start Date
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("expiryDate")} className="flex items-center gap-1">
                Expiry Date
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("paymentStatus")} className="flex items-center gap-1">
                Status
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden lg:table-cell">Auto Renew</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMemberships.map((membership) => (
            <TableRow key={membership.id}>
              <TableCell className="font-medium">{membership.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={membership.member.image} alt={membership.member.name} />
                    <AvatarFallback>{membership.member.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{membership.member.name}</div>
                    <div className="text-xs text-muted-foreground">{membership.member.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    membership.plan === "Premium" ? "default" : membership.plan === "Standard" ? "outline" : "secondary"
                  }
                >
                  {membership.plan}
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  {membership.amount}/{membership.plan === "Day Pass" ? "day" : "month"}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{membership.startDate}</TableCell>
              <TableCell>{membership.expiryDate}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    membership.paymentStatus === "Paid"
                      ? "default"
                      : membership.paymentStatus === "Pending"
                        ? "outline"
                        : membership.paymentStatus === "Overdue"
                          ? "destructive"
                          : "outline"
                  }
                >
                  {membership.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {membership.autoRenew ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Auto Renew
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    Manual
                  </Badge>
                )}
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
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Membership
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment History
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Renew Membership
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

