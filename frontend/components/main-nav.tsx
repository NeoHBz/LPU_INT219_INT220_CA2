"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Dumbbell, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser, selectIsUserAdmin, selectOnlyLogin, setUserInformation } from "@/lib/userSlice"

export function MainNav() {
    const [open, setOpen] = React.useState(false)
    const isAdmin = useSelector(selectIsUserAdmin);
    const pathname = usePathname()
    const isLogin = useSelector(selectOnlyLogin);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logoutUser());
        router.push("/login");
    }

    const allRoutes = [
        { href: "/", label: "Home" },
        { href: "/dashboard", label: "Dashboard", adminOnly: true },
        { href: "/profile", label: "Profile" },
        { href: "/members", label: "Members", adminOnly: true },
        { href: "/classes", label: "Classes" },
        { href: "/trainers", label: "Trainers" },
        { href: "/equipment", label: "Equipment" },
        // { href: "/attendance", label: "Attendance", adminOnly: true },
        { href: "/memberships", label: "Memberships", adminOnly: true },
    ];

    const routes = isLogin
        ? allRoutes
            .filter(route => !route.adminOnly || isAdmin)
            .map(route => ({
                ...route,
                active: pathname === route.href,
            }))
        : [];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background flex  items-center justify-center">
            <div className="container flex h-16 items-center justify-between ">
                <Link href="/" className="flex items-center space-x-2">
                    <Dumbbell className="h-6 w-6 text-blue-600" />
                    <span className="font-bold text-xl">FitTrack Pro</span>
                </Link>
                <nav className="hidden md:flex ml-auto items-center space-x-6">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                route.active ? "text-blue-600" : "text-muted-foreground"
                            )}
                        >
                            {route.label}

                        </Link>
                    ))}
                    {!isLogin ? (<Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>) : <Button variant="outline" onClick={handleLogout}>Logout</Button>}
                </nav>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild className="md:hidden ml-auto">
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex items-center justify-between">
                            <Link
                                href="/"
                                className="flex items-center space-x-2"
                                onClick={() => setOpen(false)}
                            >
                                <Dumbbell className="h-6 w-6 text-blue-600" />
                                <span className="font-bold">FitTrack Pro</span>
                            </Link>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setOpen(false)}
                            >
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close navigation menu</span>
                            </Button>
                        </div>
                        <nav className="mt-8 flex flex-col space-y-4">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        route.active ? "text-blue-600" : "text-muted-foreground"
                                    )}
                                    onClick={() => setOpen(false)}
                                >
                                    {route.label}
                                </Link>
                            ))}
                            {!isLogin ? (<Button asChild>
                                <Link href="/login" onClick={() => setOpen(false)}>
                                    Login
                                </Link>
                            </Button>) : (<Button  onClick={handleLogout}>Logout</Button>)}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

