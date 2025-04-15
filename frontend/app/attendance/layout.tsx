import { MainNav } from "@/components/main-nav";
import RequireAuth from "@/lib/auth/requireAuth";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <RequireAuth page="/attendance">
        <MainNav />
        {children}</RequireAuth >;
}