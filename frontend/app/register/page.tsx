'use client'
import Link from "next/link"
import { Dumbbell } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSignUpMutation } from "@/lib/user"

export default function RegisterPage() {
    const router = useRouter();
    const [signUp, { data, isLoading, error }] = useSignUpMutation();
    const [formData, setFormData] = useState({
        id: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone_number: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        signUp(formData);
    };
    useEffect(() => {
        console.log(formData);
    }, [formData])
    
    useEffect(() => {
        console.log(data, isLoading, error)
        if (data && !error) {
            router.push("/classes");
            // dispatch user information
        }
    }, [data, isLoading, error, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
            <Card className="mx-auto max-w-md w-full">
                <CardHeader className="space-y-3 text-center pb-6">
                    <div className="flex justify-center mb-2">
                        <Dumbbell className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold">FitTrack Pro</CardTitle>
                    <CardDescription className="text-sm">Create your account to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first_name" className="text-sm font-medium">First Name</Label>
                                <Input
                                    id="first_name"
                                    type="text"
                                    required
                                    className="h-10"
                                    value={formData.first_name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last_name" className="text-sm font-medium">Last Name</Label>
                                <Input
                                    id="last_name"
                                    type="text"
                                    required
                                    className="h-10"
                                    value={formData.last_name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                required
                                className="h-10"
                                value={formData.username}
                                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="hello@example.com"
                                required
                                className="h-10"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone_number" className="text-sm font-medium">Phone Number</Label>
                            <Input
                                id="phone_number"
                                type="tel"
                                placeholder="(123) 456-7890"
                                className="h-10"
                                value={formData.phone_number}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                className="h-10"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">Registration failed. Please try again.</p>}

                        <Button className="w-full h-10 mt-2" type="submit" disabled={isLoading}>
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center pt-2 pb-6">
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}