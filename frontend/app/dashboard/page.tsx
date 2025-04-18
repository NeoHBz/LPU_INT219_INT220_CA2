"use client"
import Link from "next/link"
import { BarChart3, Calendar, CreditCard, Dumbbell, Users, UserPlus, Clock, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { UpcomingClasses } from "@/components/dashboard/upcoming-classes"
import { MembershipStats } from "@/components/dashboard/membership-stats"
import { AttendanceChart } from "@/components/dashboard/attendance-chart"
import { useEffect, useState } from "react"
import { Dashboard } from "@/types/Dashboard"

export default function DashboardPage() {
    const [totalMembers, setTotalMembers] = useState(1248)
    const [activeClasses, setActiveClasses] = useState(42)
    const [revenue, setRevenue] = useState(24563)
    const [activeTrainers, setActiveTrainers] = useState(15)
    const [newTrainers, setNewTrainers] = useState(5);
  
    // const fetchData = async () => {
    //     try {
    //         const [res1] = await Promise.all([
    //             fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`),
    //         ]);
    //         const [data1] = await Promise.all([
    //             res1.json() as Promise<Dashboard>,
    //         ])
            
    //         setTotalMembers(+data1.totalMembers);
    //         setActiveClasses(+data1.activeClasses);
    //         setRevenue(+data1.revenue);
    //         setActiveTrainers(+data1.activeTrainers);
    //         setNewTrainers(+data1.newTrainers);
    //     }
    //     catch (error) {
    //         if (error instanceof Error) {
    //             console.error('API calls failed:', error.message);
    //             return;
    //         }
    //     }
    // }


    
    //   useEffect(() => {
    //       fetchData();
    //   }, [])
      
    
    
    // const [totalMembers, activeClasses, revenue, activeTrainers,newTrainers, attendanceOverview] = 
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          {/* <Link
            href="/members/new"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Link> */}
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        {/* <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger> 
           <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger> 
          </TabsList> 
        */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Members
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMembers}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Classes
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeClasses}</div>
                <p className="text-xs text-muted-foreground">
                  +3 new classes this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenue}</div>
                <p className="text-xs text-muted-foreground">
                  +18.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Trainers
                </CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                              <div className="text-2xl font-bold">{ activeTrainers}</div>
                              <p className="text-xs text-muted-foreground">+{ newTrainers} new trainers</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>
                  Daily attendance for the past 30 days
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AttendanceChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Classes scheduled for today</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingClasses />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  Latest member check-ins and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Membership Statistics</CardTitle>
                <CardDescription>
                  Breakdown of current membership types
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <MembershipStats />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
      </Tabs>
    </div>
  );
}

