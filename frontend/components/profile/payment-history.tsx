import { CreditCard, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const payments = [
  {
    id: "INV-001",
    date: "Mar 15, 2023",
    amount: "$79.99",
    description: "Premium Membership - Monthly",
    status: "Paid",
    paymentMethod: "Visa ending in 4567",
  },
  {
    id: "INV-002",
    date: "Feb 15, 2023",
    amount: "$79.99",
    description: "Premium Membership - Monthly",
    status: "Paid",
    paymentMethod: "Visa ending in 4567",
  },
  {
    id: "INV-003",
    date: "Jan 15, 2023",
    amount: "$79.99",
    description: "Premium Membership - Monthly",
    status: "Paid",
    paymentMethod: "Visa ending in 4567",
  },
  {
    id: "INV-004",
    date: "Dec 15, 2022",
    amount: "$79.99",
    description: "Premium Membership - Monthly",
    status: "Paid",
    paymentMethod: "Visa ending in 4567",
  },
  {
    id: "INV-005",
    date: "Nov 15, 2022",
    amount: "$79.99",
    description: "Premium Membership - Monthly",
    status: "Paid",
    paymentMethod: "Visa ending in 4567",
  },
]

export function PaymentHistory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Payment Methods</h3>
        <Button variant="outline" size="sm">
          Add Payment Method
        </Button>
      </div>

      <div className="rounded-lg border p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-md p-2 text-white">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <div className="font-medium">Visa ending in 4567</div>
              <div className="text-sm text-muted-foreground">Expires 05/25</div>
            </div>
          </div>
          <Badge>Default</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Recent Payments</h3>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Invoice</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="px-4 py-3 font-medium">{payment.id}</td>
                    <td className="px-4 py-3">{payment.date}</td>
                    <td className="px-4 py-3">{payment.amount}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="outline">View All Payments</Button>
      </div>
    </div>
  )
}

