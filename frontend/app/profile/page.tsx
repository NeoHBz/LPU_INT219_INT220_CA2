import { CalendarClock, CreditCard, Dumbbell, History, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ProfileForm } from "@/components/profile/profile-form"
import { MembershipDetails } from "@/components/profile/membership-details"
import { ClassHistory } from "@/components/profile/class-history"
import { PaymentHistory } from "@/components/profile/payment-history"

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <div className="flex items-center space-x-2">
          <Button>Edit Profile</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Member Information</CardTitle>
            <CardDescription>View and manage your personal information and settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-bold">John Smith</h3>
                <p className="text-sm text-muted-foreground">Member since January 2023</p>
                <div className="mt-2 flex justify-center">
                  <Badge className="mr-1">Premium Member</Badge>
                  <Badge variant="outline">ID: M001</Badge>
                </div>
              </div>
              <div className="w-full space-y-2 pt-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <span className="text-sm">john.smith@example.com</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <span className="text-sm">(555) 123-4567</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Membership Expires</span>
                  </div>
                  <span className="text-sm">January 15, 2024</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center space-x-2">
                    <Dumbbell className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Fitness Goals</span>
                  </div>
                  <span className="text-sm">Weight Loss, Strength</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-4 space-y-4">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="personal">
                <User className="mr-2 h-4 w-4" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="membership">
                <CreditCard className="mr-2 h-4 w-4" />
                Membership
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="mr-2 h-4 w-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="mr-2 h-4 w-4" />
                Payments
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal information and preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="membership">
              <Card>
                <CardHeader>
                  <CardTitle>Membership Details</CardTitle>
                  <CardDescription>View your current membership plan and benefits.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MembershipDetails />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                  <CardDescription>View your recent gym visits and class attendance.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ClassHistory />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>View your recent payments and billing information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <PaymentHistory />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

