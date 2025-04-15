"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserInformation } from "@/lib/userSlice";


const allRoutes = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard", adminOnly: true },
    { href: "/profile", label: "Profile", onlyLogin: true },
    { href: "/members", label: "Members", adminOnly: true },
    { href: "/classes", label: "Classes", onlyLogin: true },
    { href: "/trainers", label: "Trainers", onlylogin: true },
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const routeInfo = allRoutes.find((r) => r.href === page);

        if (!userInfo?.email) {
            router.push("/login");
        } else if (routeInfo?.adminOnly && !userInfo.isAdmin) {

            router.push("/unauthorized");
        }
        else {
            setLoading(false);  // Set loading to false once check is done
        }
    }, [userInfo, router, page]);
    if (loading) {
        return null;
    }

    return <>{children}</>;
}
