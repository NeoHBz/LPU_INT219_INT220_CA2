"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserInformation } from "@/lib/userSlice";

const allRoutes = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard", adminOnly: true },
    { href: "/profile", label: "Profile", onlyLogin: true },
    { href: "/members", label: "Members", adminOnly: true },
    { href: "/classes", label: "Classes", adminOnly: true },
    { href: "/trainers", label: "Trainers", adminOnly: true },
    { href: "/equipment", label: "Equipment", adminOnly: true },
    { href: "/attendance", label: "Attendance", adminOnly: true },
    { href: "/memberships", label: "Memberships", adminOnly: true },
];

export default function RequireAuth({
    children,
    page,
}: {
    children: React.ReactNode;
    page: string;
}) {
    const router = useRouter();
    const userInfo = useSelector(selectUserInformation);

    useEffect(() => {
        const routeInfo = allRoutes.find((r) => r.href === page);

        if (!userInfo?.email) {
            router.push("/login");
        } else if (routeInfo?.adminOnly && !userInfo.isAdmin) {
            router.push("/unauthorized");
        }
    }, [userInfo, router, page]);

    if (!userInfo?.email) return null;
    if (allRoutes.find((r) => r.href === page)?.adminOnly && userInfo.role !== "admin")
        return null;

    return <>{children}</>;
}
