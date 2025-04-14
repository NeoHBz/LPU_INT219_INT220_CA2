import Link from "next/link"
import { Check, Edit, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data
const plans = [
  {
    id: "plan-1",
    name: "Basic",
    price: 29.99,
    interval: "month",
    description: "Access to basic gym facilities during off-peak hours",
    features: [
      "Access to gym equipment",
      "Locker room access",
      "Off-peak hours only (9AM-4PM)",
      "No guest passes",
      "No class access",
    ],
    popular: false,
    members: 210,
  },
  {
    id: "plan-2",
    name: "Standard",
    price: 49.99,
    interval: "month",
    description: "Full access to gym facilities and limited classes",
    features: [
      "24/7 gym access",
      "Locker room access",
      "2 guest passes per month",
      "Access to 5 classes per month",
      "Fitness assessment",
    ],
    popular: true,
    members: 620,
  },
  {
    id: "plan-3",
    name: "Premium",
    price: 79.99,
    interval: "month",
    description: "Unlimited access to all facilities and classes",
    features: [
      "24/7 gym access",
      "Locker room access with towel service",
      "5 guest passes per month",
      "Unlimited class access",
      "Monthly personal training session",
      "Nutrition consultation",
    ],
    popular: false,
    members: 540,
  },
  {
    id: "plan-4",
    name: "Day Pass",
    price: 15.99,
    interval: "day",
    description: "Single day access to all gym facilities",
    features: [
      "Full day gym access",
      "Locker room access",
      "No guest passes",
      "Access to classes on the day (if available)",
    ],
    popular: false,
    members: 88,
  },
]

export function MembershipPlans() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan) => (
        <Card key={plan.id} className={plan.popular ? "border-primary" : ""}>
          {plan.popular && (
            <div className="absolute right-4 top-4 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
              Popular
            </div>
          )}
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/{plan.interval}</span>
            </div>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground">{plan.members} active members</div>
            <div className="flex w-full justify-between">
              <Button asChild variant="outline">
                <Link href={`/memberships/${plan.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate Plan</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Plan
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

