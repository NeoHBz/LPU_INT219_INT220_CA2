import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MembershipPlans } from "@/components/memberships/membership-plans"
import { MembershipTable } from "@/components/memberships/membership-table"

export default function MembershipsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Memberships</h2>
        <div className="flex items-center space-x-2">
          <Link
            href="/memberships/new"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Link>
        </div>
      </div>
      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Membership Plans</TabsTrigger>
          <TabsTrigger value="members">Member Subscriptions</TabsTrigger>
          <TabsTrigger value="renewals">Upcoming Renewals</TabsTrigger>
        </TabsList>
        <TabsContent value="plans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Membership Plans</CardTitle>
              <CardDescription>View and manage your gym's membership plans and pricing.</CardDescription>
            </CardHeader>
            <CardContent>
              <MembershipPlans />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Subscriptions</CardTitle>
              <CardDescription>View and manage member subscriptions and payment status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex w-full items-center space-x-2 sm:w-auto">
                    <div className="relative w-full sm:w-[300px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search members..." className="w-full pl-8" />
                    </div>
                  </div>
                </div>
                <MembershipTable />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="renewals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Renewals</CardTitle>
              <CardDescription>View and manage upcoming membership renewals.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Upcoming renewals will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

