"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Download, Filter, Search, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MembersTable } from "@/components/members/members-table"
import { MainNav } from "@/components/main-nav"

export default function MembersPage() {
  const [filterStatus, setFilterStatus] = useState<string[]>(["active"])

    return (
        <>
            <MainNav />
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Members</h2>
        {/* <div className="flex items-center space-x-2">
          <Link
            href="/members/new"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                        >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Link>
        </div> */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Member Management</CardTitle>
          <CardDescription>
            View and manage all your gym members. Add new members, edit profiles, or update membership status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex w-full items-center space-x-2 sm:w-auto">
                <div className="relative w-full sm:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search members..." className="w-full pl-8" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-1">
                      <Filter className="h-4 w-4" />
                      Filter
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuCheckboxItem
                      checked={filterStatus.includes("active")}
                      onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setFilterStatus([...filterStatus, "active"])
                                                    } else {
                                                        setFilterStatus(filterStatus.filter((item) => item !== "active"))
                                                    }
                                                }}
                                            >
                      Active Members
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filterStatus.includes("inactive")}
                      onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setFilterStatus([...filterStatus, "inactive"])
                                                    } else {
                                                        setFilterStatus(filterStatus.filter((item) => item !== "inactive"))
                                                    }
                                                }}
                                            >
                      Inactive Members
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filterStatus.includes("expired")}
                      onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setFilterStatus([...filterStatus, "expired"])
                                                    } else {
                                                        setFilterStatus(filterStatus.filter((item) => item !== "expired"))
                                                    }
                                                }}
                                            >
                      Expired Memberships
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            <MembersTable />
          </div>
        </CardContent>
      </Card>
    </div>
        </>
  )
}

