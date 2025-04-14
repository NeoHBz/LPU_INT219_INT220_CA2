import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrainersList } from "@/components/trainers/trainers-list"

export default function TrainersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trainers</h2>
        <div className="flex items-center space-x-2">
          <Link
            href="/trainers/new"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Trainer
          </Link>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Trainer Management</CardTitle>
          <CardDescription>
            View and manage your fitness trainers. Add new trainers, edit profiles, or update availability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex w-full items-center space-x-2 sm:w-auto">
                <div className="relative w-full sm:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search trainers..." className="w-full pl-8" />
                </div>
              </div>
            </div>
            <TrainersList />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

