"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpDown, Calendar, Clock, Edit, MoreHorizontal, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClassesList } from "@/types/ClassesList"
import { useSelector } from "react-redux"
import { selectIsUserAdmin } from "@/lib/userSlice"
import { useLazyAllClassesQuery } from "@/lib/user"

export function ClassesTable() {
    const [selectedClasses, setSelectedClasses] = useState<string[]>([])
    const [classes, setClasses] = useState<ClassesList[]>([])
    const [sortColumn, setSortColumn] = useState<string>("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const isAdmin = useSelector(selectIsUserAdmin);
    const [getClasses, { data: classesOfUser, isError, error, isLoading }] = useLazyAllClassesQuery();
    useEffect(() => {
        if (isAdmin) {
            getClasses("");
        }
    }, [isAdmin])
    useEffect(() => {

        if (classesOfUser) {
            // console.log(classesOfUser);
            // const transformedResponse = classesOfUser.data.schedule.map((item: any) => {
            //     const schedule = item.schedule.map((scheduleItem: any) => {
            //         return scheduleItem.day_of_week.toLowerCase().substring(0, 3);
            //     });
            //     return { ...item, schedule: schedule.join(", ") };
            // });
            // console.log(transformedResponse);
            const transformedResponse = classesOfUser.data.map((item: any) => {
                const schedule = item.schedule.map((scheduleItem: any) => {
                    return scheduleItem.day_of_week.toLowerCase().substring(0, 3);
                });
                return { ...item, schedule: schedule.join(", "), time: item.schedule[0].start_time };
            });
            setClasses(transformedResponse);
        }
    }, [classesOfUser, isError, isLoading])



    const toggleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedClasses = [...classes].sort((a, b) => {
        const aValue = a[sortColumn as keyof typeof a]
        const bValue = b[sortColumn as keyof typeof b]

        if (typeof aValue === "string" && typeof bValue === "string") {
            return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        return 0
    })

    const toggleSelectAll = () => {
        if (selectedClasses.length === classes.length) {
            setSelectedClasses([])
        } else {
            setSelectedClasses(classes.map((cls) => cls.id))
        }
    }

    const toggleSelectClass = (id: string) => {
        if (selectedClasses.includes(id)) {
            setSelectedClasses(selectedClasses.filter((classId) => classId !== id))
        } else {
            setSelectedClasses([...selectedClasses, id])
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox
                                checked={selectedClasses.length === classes.length && classes.length > 0}
                                onCheckedChange={toggleSelectAll}
                                aria-label="Select all classes"
                            />
                        </TableHead>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => toggleSort("name")} className="flex items-center gap-1">
                                Class Name
                                <ArrowUpDown className="h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            <Button variant="ghost" onClick={() => toggleSort("type")} className="flex items-center gap-1">
                                Type
                                <ArrowUpDown className="h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>trainer</TableHead>
                        <TableHead className="hidden lg:table-cell">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Schedule
                            </div>
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Time
                            </div>
                        </TableHead>
                        <TableHead>
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                Capacity
                            </div>
                        </TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedClasses.map((classItem) => (
                        <TableRow key={classItem.id} className={selectedClasses.includes(classItem.id) ? "bg-muted/50" : undefined}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedClasses.includes(classItem.id)}
                                    onCheckedChange={() => toggleSelectClass(classItem.id)}
                                    aria-label={`Select ${classItem.class_name}`}
                                />
                            </TableCell>
                            <TableCell className="font-medium">{classItem.id}</TableCell>
                            <TableCell>
                                <div className="font-medium">{classItem.class_name}</div>
                                <div className="text-sm text-muted-foreground md:hidden">{classItem.type}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <Badge variant="outline">{classItem.type}</Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={classItem.trainer.image} alt={classItem.trainer.name} />
                                        {/* <AvatarFallback>{classItem.trainer.initials}</AvatarFallback> */}
                                    </Avatar>
                                    <span className="hidden md:inline">{classItem.trainer.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">{classItem.schedule}</TableCell>
                            <TableCell className="hidden md:table-cell">{classItem.time}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        classItem.enrolled === classItem.max_capacity
                                            ? "destructive"
                                            : classItem.enrolled / classItem.max_capacity > 0.8
                                                ? "outline"
                                                : "default"
                                    }
                                >
                                    {classItem.enrolled}/{classItem.max_capacity}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/classes/${classItem.id}`}>
                                                <Calendar className="mr-2 h-4 w-4" />
                                                View Details
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/classes/${classItem.id}/edit`}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Class
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Cancel Class
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function selectAllClassesQuery(state: unknown): unknown {
    throw new Error("Function not implemented.")
}

