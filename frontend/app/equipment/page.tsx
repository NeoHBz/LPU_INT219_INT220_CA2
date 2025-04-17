"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Download, Filter, Plus, Search, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EquipmentTable } from "@/components/equipment/equipment-table"
import { MaintenanceTable } from "@/components/equipment/maintenance-table"

export default function EquipmentPage() {
  const [filterStatus, setFilterStatus] = useState<string[]>(["operational"])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipment</h2>
        <div className="flex items-center space-x-2">
          <Link
            href="/equipment/new"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Equipment
          </Link>
        </div>
      </div>
      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          {/* <TabsTrigger value="usage">Usage Analytics</TabsTrigger> */}
        </TabsList>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Inventory</CardTitle>
              <CardDescription>
                View and manage all gym equipment. Add new equipment, track maintenance, or update status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex w-full items-center space-x-2 sm:w-auto">
                    <div className="relative w-full sm:w-[300px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search equipment..." className="w-full pl-8" />
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
                          checked={filterStatus.includes("operational")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilterStatus([...filterStatus, "operational"])
                            } else {
                              setFilterStatus(filterStatus.filter((item) => item !== "operational"))
                            }
                          }}
                        >
                          Operational
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filterStatus.includes("maintenance")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilterStatus([...filterStatus, "maintenance"])
                            } else {
                              setFilterStatus(filterStatus.filter((item) => item !== "maintenance"))
                            }
                          }}
                        >
                          Under Maintenance
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filterStatus.includes("out-of-order")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilterStatus([...filterStatus, "out-of-order"])
                            } else {
                              setFilterStatus(filterStatus.filter((item) => item !== "out-of-order"))
                            }
                          }}
                        >
                          Out of Order
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm" className="h-9">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
                <EquipmentTable />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>View and manage equipment maintenance schedules and history.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex w-full items-center space-x-2 sm:w-auto">
                    <div className="relative w-full sm:w-[300px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search maintenance records..." className="w-full pl-8" />
                    </div>
                    <Button variant="outline" size="sm" className="h-9 gap-1">
                      <Settings className="h-4 w-4" />
                      Schedule Maintenance
                    </Button>
                  </div>
                </div>
                <MaintenanceTable />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Usage Analytics</CardTitle>
              <CardDescription>View equipment usage statistics and analytics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Equipment usage analytics will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

