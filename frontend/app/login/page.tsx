// import Link from "next/link"
// import { Dumbbell } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"

// export default function LoginPage() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
//       <Card className="mx-auto max-w-sm">
//         <CardHeader className="space-y-1 text-center">
//           <div className="flex justify-center mb-2">
//             <Dumbbell className="h-10 w-10 text-blue-600" />
//           </div>
//           <CardTitle className="text-2xl font-bold">FitTrack Pro</CardTitle>
//           <CardDescription>Enter your credentials to access your account</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" type="email" placeholder="m@example.com" required />
//           </div>
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="password">Password</Label>
//               <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
//                 Forgot password?
//               </Link>
//             </div>
//             <Input id="password" type="password" required />
//           </div>
//           <div className="flex items-center space-x-2">
//             <Checkbox id="remember" />
//             <Label htmlFor="remember" className="text-sm font-normal">
//               Remember me
//             </Label>
//           </div>
//         </CardContent>
//         <CardFooter className="flex flex-col space-y-4">
//           <Button className="w-full" asChild>
//             <Link href="/dashboard">Sign In</Link>
//           </Button>
//           <div className="text-center text-sm">
//             Don't have an account?{" "}
//             <Link href="/register" className="text-blue-600 hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }



'use client'
import Link from "next/link"
import { Dumbbell } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useSignInMutation } from "@/lib/user"

export default function LoginPage() {
    const router = useRouter();
    const [signIn, { data, isLoading, error }] = useSignInMutation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // try {
        signIn(formData);
        // if (response.data) {
        //     router.push('/profile');
        // }
        // } catch (err) {
        //     console.error(err);
        // }
    };
    useEffect(() => {
        if (data && !error) {
            router.push("/classes");
            //  dispatch user information 
        }

    }, [data, isLoading, error])


    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-2">
                        <Dumbbell className="h-10 w-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold">FitTrack Pro</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={formData.remember}
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, remember: checked as boolean }))}
                            />
                            <Label htmlFor="remember" className="text-sm font-normal">
                                Remember me
                            </Label>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">Invalid credentials</p>}
                        <CardFooter className="flex flex-col space-y-4 px-0">
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                            <div className="text-center text-sm">
                                Don't have an account?{" "}
                                <Link href="/register" className="text-blue-600 hover:underline">
                                    Sign up
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

