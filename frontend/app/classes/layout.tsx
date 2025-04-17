import { MainNav } from "@/components/main-nav";
import RequireAuth from "@/lib/auth/requireAuth";


export default function classesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <RequireAuth page="/classes">
        <MainNav />{children}</RequireAuth>;
}