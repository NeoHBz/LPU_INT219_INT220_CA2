import RequireAuth from "@/lib/auth/requireAuth";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <RequireAuth page="/dashboard">{children}</RequireAuth>;
}