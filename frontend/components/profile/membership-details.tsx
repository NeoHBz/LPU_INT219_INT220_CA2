import { Check, CreditCard, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function MembershipDetails() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold">Premium Membership</h3>
          <p className="text-sm text-muted-foreground">Billed monthly</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">$79.99/month</div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <RefreshCw className="mr-1 h-3 w-3" />
            Auto Renew On
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Current Period</span>
          <span className="font-medium">Jan 15, 2023 - Jan 15, 2024</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Time Remaining</span>
            <span className="font-medium">245 days</span>
          </div>
          <Progress value={33} className="h-2" />
        </div>
        <div className="flex justify-between text-sm">
          <span>Payment Method</span>
          <span className="flex items-center font-medium">
            <CreditCard className="mr-1 h-3 w-3" />
            Visa ending in 4567
          </span>
        </div>
      </div>

      <div className="rounded-md border p-4">
        <h4 className="font-semibold mb-2">Membership Benefits</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>24/7 gym access</span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>Locker room access with towel service</span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>5 guest passes per month</span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>Unlimited class access</span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>Monthly personal training session</span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>Nutrition consultation</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <Button className="w-full sm:w-auto">Change Plan</Button>
        <Button variant="outline" className="w-full sm:w-auto">
          Manage Payment
        </Button>
      </div>
    </div>
  )
}

