"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
const equipmentFormSchema = z.object({
    name: z.string().min(2, {
        message: "Equipment name must be at least 2 characters.",
    }),
    model: z.string().min(1, {
        message: "Please enter a model number.",
    }),
    serialNumber: z.string().min(1, {
        message: "Please enter a serial number.",
    }),
    location: z.string().min(1, {
        message: "Please enter a location.",
    }),
    purchaseDate: z.date({
        required_error: "Please select a purchase date.",
    }),
    warrantyExpiry: z.date().optional(),
    status: z.string().min(1, {
        message: "Please select a status.",
    }),
    vendor: z.string().optional(),
    price: z.coerce.number().min(0, {
        message: "Price must be a positive number.",
    }),
    notes: z.string().optional(),
})

type EquipmentFormValues = z.infer<typeof equipmentFormSchema>

const equipmentStatuses = [
    { id: "operational", name: "Operational" },
    { id: "maintenance", name: "Under Maintenance" },
    { id: "out-of-order", name: "Out of Order" },
    { id: "new", name: "New (Not Installed)" },
]

const locations = [
    { id: "weight-room", name: "Weight Room" },
    { id: "cardio-area", name: "Cardio Area" },
    { id: "studio-1", name: "Studio 1" },
    { id: "studio-2", name: "Studio 2" },
    { id: "spin-room", name: "Spin Room" },
    { id: "pool-area", name: "Pool Area" },
    { id: "storage", name: "Storage" },
]

export default function NewEquipmentPage() {
    const router = useRouter()
    

    const form = useForm<EquipmentFormValues>({
        resolver: zodResolver(equipmentFormSchema),
        defaultValues: {
            name: "",
            model: "",
            serialNumber: "",
            location: "",
            purchaseDate: new Date(),
            status: "operational",
            vendor: "",
            price: 0,
            notes: "",
        },
    })

    function onSubmit(data: EquipmentFormValues) {
        console.log(data)
        // Format the data for the API
        const formattedData = {
            name: data.name,
            model: data.model,
            serialNumber: data.serialNumber,
            location: data.location,
            purchaseDate: format(data.purchaseDate, "yyyy-MM-dd"),
            warrantyExpiry: data.warrantyExpiry ? format(data.warrantyExpiry, "yyyy-MM-dd") : null,
            status: data.status,
            vendor: data.vendor || "",
            price: data.price,
            notes: data.notes || "",
            // Add default values for other required fields in your API
            lastMaintenance: format(new Date(), "yyyy-MM-dd"),
            nextMaintenance: format(new Date(new Date().setMonth(new Date().getMonth() + 3)), "yyyy-MM-dd"),
            usageHours: 0,
        }

        // Send the data to the API
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/equipment/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add equipment")
                }
                return response.json()
            })
            .then(() => {
                // Show success toast
                // showToast("Equipment added successfully!", "success")
                // On success, redirect to the equipment page
                router.push("/equipment")
            })
            .catch((error) => {
                console.error("Error adding equipment:", error)
                // Show error toast
                // showToast("Failed to add equipment. Please try again.", "error")
            })
    }

    return (
        <>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Add New Equipment</h2>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Equipment Information</CardTitle>
                        <CardDescription>Enter the details for the new equipment.</CardDescription>
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
                                                <FormLabel>Equipment Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Treadmill" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="model"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Model</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="TR-2000" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="serialNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Serial Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="SN12345678" {...field} />
                                                </FormControl>
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
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a location" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {locations.map((location) => (
                                                            <SelectItem key={location.id} value={location.id}>
                                                                {location.name}
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
                                        name="purchaseDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Purchase Date</FormLabel>
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
                                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="warrantyExpiry"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Warranty Expiry Date</FormLabel>
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
                                                            selected={field.value || undefined}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormDescription>Optional</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {equipmentStatuses.map((status) => (
                                                            <SelectItem key={status.id} value={status.id}>
                                                                {status.name}
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
                                        name="vendor"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vendor</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Supplier name" {...field} />
                                                </FormControl>
                                                <FormDescription>Optional</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Purchase Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Additional information about the equipment"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Optional details about maintenance requirements, usage instructions, etc.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end space-x-4">
                                    <Button type="button" variant="outline" onClick={() => router.push("/equipment")}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Add Equipment</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
