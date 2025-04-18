"use client"

import * as React from "react"
import { addDays, format, startOfWeek, addWeeks, subWeeks } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ClassesList } from "@/types/ClassesList"
import { selectIsUserAdmin } from "@/lib/userSlice"
import { useSelector } from "react-redux"
import { useLazyAllClassesQuery } from "@/lib/user"
import { useEffect } from "react"


export function ClassesCalendar() {
    const [currentDate, setCurrentDate] = React.useState(new Date())
    const [classSchedule, setClassSchedule] = React.useState<ClassesList[]>([])
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }) // Start from Monday
    const isAdmin = useSelector(selectIsUserAdmin);
    // const [getClasses, { data: classesOfUser, isError, isLoading }] = useLazyAllClassesQuery();
    const colorPalettes = [
        { bg: "bg-blue-100", border: "border-blue-300", text: "text-blue-700" },
        { bg: "bg-red-100", border: "border-red-300", text: "text-red-700" },
        { bg: "bg-green-100", border: "border-green-300", text: "text-green-700" },
        { bg: "bg-purple-100", border: "border-purple-300", text: "text-purple-700" },
        { bg: "bg-indigo-100", border: "border-indigo-300", text: "text-indigo-700" },
        { bg: "bg-yellow-100", border: "border-yellow-300", text: "text-yellow-700" },
        { bg: "bg-pink-100", border: "border-pink-300", text: "text-pink-700" },
        { bg: "bg-teal-100", border: "border-teal-300", text: "text-teal-700" },
    ];
    // React.useEffect(() => {
    //     if (isAdmin) {
    //         getClasses("");
    //     }
    // }, [isAdmin])
    useEffect(() => {
        const fetchClasses = async () => {
            const response = await fetch(`http://localhost:9876/api/allClasses`);
            const data = await response.json();
            console.log("Here is the adata assholes", data)
            setClassSchedule(data);
        };
        fetchClasses();

    }, [])

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colorPalettes.length);
        const palette = colorPalettes[randomIndex];
        return `${palette.bg} ${palette.border} ${palette.text}`;
    };
    const nextWeek = () => {
        setCurrentDate(addWeeks(currentDate, 1))
    }

    const prevWeek = () => {
        setCurrentDate(subWeeks(currentDate, 1))
    }

    const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

    const getClassesForDay = (dayIndex: number) => {
        // Convert from 0-based (Sunday = 0) to 1-based (Monday = 1)
        const adjustedDayIndex = dayIndex === 0 ? 7 : dayIndex
        return classSchedule?.filter((cls) => cls.days.includes(adjustedDayIndex))
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                    {format(startDate, "MMMM d, yyyy")} - {format(addDays(startDate, 6), "MMMM d, yyyy")}
                </h3>
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={prevWeek}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous week</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                        Today
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextWeek}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next week</span>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {days?.map((day, index) => (
                    <div key={index} className="text-center">
                        <div className="mb-1 font-medium">{format(day, "EEE")}</div>
                        <div
                            className={`rounded-md p-1 text-sm ${format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? "bg-primary/10" : ""}`}
                        >
                            {format(day, "d")}
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {days?.map((day, dayIndex) => {
                    const dayClasses = getClassesForDay(day.getDay()) ?? []
                    return (
                        <div key={dayIndex} className="min-h-[200px] rounded-md border p-2">
                            {dayClasses.length === 0 ? (
                                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No classes</div>
                            ) : (
                                <div className="space-y-2">
                                    {dayClasses.map((cls) => (
                                        <Card key={cls.id} className={`cursor-pointer border ${getRandomColor()}`}>
                                            <CardContent className="p-2">
                                                {/* @ts-ignore */}
                                                <div className="text-sm font-medium">{cls.name}</div>
                                                <div className="flex items-center gap-1 text-xs">
                                                    <Avatar className="h-5 w-5">
                                                        <AvatarImage src={""} alt={cls.trainer.name} />
                                                        <AvatarFallback className="text-[10px] text-black">{cls.trainer.name.split(" ")[0].substring(0, 1).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    {cls.trainer.name}
                                                </div>
                                                <div className="mt-1 text-xs">{cls.time}</div>
                                                <div className="mt-1 flex justify-between text-xs">
                                                    <span>{cls.location}</span>
                                                    <Badge variant="outline" className="text-[10px]">
                                                        View
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

