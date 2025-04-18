"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInformation, setUserInformation } from "@/lib/userSlice";
import { useLazyWhoAmiQuery } from "@/lib/user";


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
    const [whoAmI, { data: userData, error, isLoading }] = useLazyWhoAmiQuery();
    const dispacth = useDispatch();
    useEffect(() => {
        const routeInfo = allRoutes.find((r) => r.href === page);
        if (userInfo.email.length < 2) {
            whoAmI("");
        }
        if (userData && userData.length > 0) {
            dispacth(setUserInformation(userData))
        }
        if (!userInfo?.email && !isLoading) {
            router.push("/login");
        } else if (routeInfo?.adminOnly && !userInfo.isAdmin && !isLoading) {

            router.push("/unauthorized");
        }
        else {
            setLoading(false);  // Set loading to false once check is done
        }
    }, [userInfo, router, page, userData]);
    if (loading) {
        return null;
    }

    return <>{children}</>;
}
