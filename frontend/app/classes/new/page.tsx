"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { MainNav } from "@/components/main-nav"
import { cn } from "@/lib/utils"
import { useAddClassMutation } from "@/lib/user"
// Add import for useToast


const classFormSchema = z.object({
    name: z.string().min(2, {
        message: "Class name must be at least 2 characters.",
    }),
    type: z.string().min(1, {
        message: "Please select a class type.",
    }),
    trainer: z.string().min(1, {
        message: "Please select a trainer.",
    }),
    location: z.string().min(1, {
        message: "Please enter a location.",
    }),
    capacity: z.coerce.number().min(1, {
        message: "Capacity must be at least 1.",
    }),
    description: z.string().optional(),
    days: z.array(z.number()).min(1, {
        message: "Please select at least one day.",
    }),
    startTime: z.string().min(1, {
        message: "Please select a start time.",
    }),
    endTime: z.string().min(1, {
        message: "Please select an end time.",
    }),
    startDate: z.date({
        required_error: "Please select a start date.",
    }),
})

type ClassFormValues = z.infer<typeof classFormSchema>

const daysOfWeek = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" },
]

const classTypes = [
    { id: "yoga", name: "Yoga" },
    { id: "pilates", name: "Pilates" },
    { id: "hiit", name: "HIIT" },
    { id: "spin", name: "Spin" },
    { id: "strength", name: "Strength Training" },
    { id: "cardio", name: "Cardio" },
    { id: "zumba", name: "Zumba" },
    { id: "boxing", name: "Boxing" },
]

// Add useToast hook inside the component
export default function NewClassPage() {
    const router = useRouter()
    
    const [trainers, setTrainers] = useState([
        { id: "T001", name: "Lisa Chen" },
        { id: "T002", name: "Marcus Johnson" },
        { id: "T003", name: "Sophia Rodriguez" },
        { id: "T004", name: "James Wilson" },
        { id: "T005", name: "Aisha Patel" },
    ])

    const form = useForm<ClassFormValues>({
        resolver: zodResolver(classFormSchema),
        defaultValues: {
            name: "",
            type: "",
            trainer: "",
            location: "",
            capacity: 20,
            description: "",
            days: [],
            startTime: "09:00",
            endTime: "10:00",
            startDate: new Date(),
        },
    })

    const [addClass, { data: addClassResponse, error, isLoading,isSuccess }]  = useAddClassMutation();
    
    
    // Update onSubmit function to use toast notifications
    function onSubmit(data: ClassFormValues) {
        console.log( data);
        const formattedData = {
            class_name: data.name,
            type: data.type,
            trainer: data.trainer,
            trainer_id: trainers.find(trainer => trainer.name === data.trainer)?.id || Math.floor(Math.random() * 10),
            location: data.location,
            capacity: data.capacity,
            description: data.description || "",
            days: data.days,
            time: `${data.startTime} - ${data.endTime}`,
            startDate: format(data.startDate, "yyyy-MM-dd"),
            max_capacity: 30,
            // Each schedule item must contain day_of_week, start_time, and end_time
            schedule: data.days.map((day) => {
                const dayName = daysOfWeek.find((d) => d.id === day)?.name || ""
                return {
                    day_of_week: dayName,
                    start_time: data.startTime,
                    end_time: data.endTime,
                }
            })
                
        }
        
        // addClass(formattedData);
        fetch(`http://localhost:5000/classes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add class")
                }
                return response.json()
            })
            .then(() => {
                router.push("/classes")
            })
            .catch((error) => {
                console.error("Error adding class:", error)
            })
    }

    const trainersList = async () => {
        const response = await fetch(`http://localhost:5000/trainers`)
        const data = await response.json();
        
        setTrainers(data);
    }
    useEffect(() => {
        trainersList();
    }, [])

    useEffect(() => {
      
    }, [trainers])
    

    useEffect(() => {
        console.log(addClassResponse, error, isLoading, isSuccess);
        if (isSuccess && addClassResponse?.status === "success") {
            // Show success toast
            console.log("Class added successfully");
            router.push("/classes")
        } else if (error) {
            // Show error toast
            console.error("Error adding class:", error);
        }
    }, [addClassResponse, error, isLoading])
    
    return (
        <>
            {/* <MainNav /> */}
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Add New Class</h2>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Class Information</CardTitle>
                        <CardDescription>Enter the details for the new class.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Class Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Morning Yoga" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Class Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select class type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {classTypes.map((type) => (
                                                            <SelectItem key={type.id} value={type.id}>
                                                                {type.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="trainer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Trainer</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a trainer" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {trainers.map((trainer) => (
                                                            <SelectItem key={trainer.id} value={trainer.id}>
                                                                {trainer.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Location</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Studio 1" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="capacity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Capacity</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormDescription>Maximum number of participants</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="startDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Start Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground",
                                                                )}
                                                            >
                                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormDescription>When the class will start being offered</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="startTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Start Time</FormLabel>
                                                <div className="flex items-center">
                                                    <FormControl>
                                                        <Input type="time" {...field} className="w-full" />
                                                    </FormControl>
                                                    <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>End Time</FormLabel>
                                                <div className="flex items-center">
                                                    <FormControl>
                                                        <Input type="time" {...field} className="w-full" />
                                                    </FormControl>
                                                    <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="days"
                                    render={() => (
                                        <FormItem>
                                            <div className="mb-4">
                                                <FormLabel className="text-base">Days of Week</FormLabel>
                                                <FormDescription>Select the days when this class will be held</FormDescription>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                                {daysOfWeek.map((day) => (
                                                    <FormField
                                                        key={day.id}
                                                        control={form.control}
                                                        name="days"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem key={day.id} className="flex flex-row items-start space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(day.id)}
                                                                            onCheckedChange={(checked) => {
                                                                                return checked
                                                                                    ? field.onChange([...field.value, day.id])
                                                                                    : field.onChange(field.value?.filter((value) => value !== day.id))
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">{day.name}</FormLabel>
                                                                </FormItem>
                                                            )
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter a description of the class" className="resize-none" {...field} />
                                            </FormControl>
                                            <FormDescription>Provide details about what participants can expect</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end space-x-4">
                                    <Button type="button" variant="outline" onClick={() => router.push("/classes")}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Create Class</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
