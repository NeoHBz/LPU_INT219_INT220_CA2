import RequireAuth from "@/lib/auth/requireAuth";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <RequireAuth page="/">{children}</RequireAuth>;
}