import Link from "next/link"
import { ArrowRight, Dumbbell, Users, Calendar, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                FitTrack Pro Management System
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                Streamline your fitness center operations with our comprehensive management solution.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/classes">View Classes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to manage your fitness center efficiently
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle>Member Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>Track member profiles, attendance, and membership renewals with ease.</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/members">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle>Class Scheduling</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create and manage class schedules, bookings, and instructor assignments.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/classes">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Award className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle>Trainer Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Assign trainers to members, track sessions, and manage trainer schedules.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/trainers">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Dumbbell className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle>Equipment Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor equipment maintenance, usage, and schedule repairs when needed.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/equipment">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle>Attendance Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track member check-ins, class attendance, and generate detailed reports.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/attendance">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle>Membership Plans</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>Create and manage membership plans, handle renewals and payments.</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/memberships">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to transform your fitness center?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of fitness centers already using our platform.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/dashboard">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Company</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="#" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Features</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/members" className="hover:underline">
                    Members
                  </Link>
                </li>
                <li>
                  <Link href="/classes" className="hover:underline">
                    Classes
                  </Link>
                </li>
                <li>
                  <Link href="/trainers" className="hover:underline">
                    Trainers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="#" className="hover:underline">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-700 pt-6 text-center">
            <p className="text-sm text-gray-400">© 2025 FitTrack Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

