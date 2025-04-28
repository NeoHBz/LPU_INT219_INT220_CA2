"use client"
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
import { useEffect, useState } from "react"
import { MembershipPlansType } from "@/types/Membership"
import { useMembershipPlansQuery } from "@/lib/user"
import { MainNav } from "@/components/main-nav"




export function MembershipPlans() {
    const [plans, setPlans] = useState<MembershipPlansType[]>([]);
    // useEffect(() => {
    //     fetch(`http://localhost:9876/api/membershipPlans`).then((res) => res.json()).then((data) => {
    //         setPlans(data)

    //     })
    // }, [])
    const { data: allMemberships } = useMembershipPlansQuery("");
    useEffect(() => {
        if (allMemberships && allMemberships.length > 0) {
            console.log(allMemberships);

            setPlans(allMemberships);
        }
    }, [allMemberships])

    return (


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" key={Math.random() * 100000}>
            {plans.map((plan) => (
                <Card key={plan.id} className={plan.popular ? "border-primary" : ""}>
                    {plan.popular && (
                        <div className="absolute right-4 top-4 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
                            Popular
                        </div>
                    )}
                    <CardHeader>
                            <CardTitle>{plan.membershipType}</CardTitle>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold">₹1{plan.price}</span>
                                <span className="text-muted-foreground">/{plan.duration}</span>
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
                            <div className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100)} active members</div>
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

