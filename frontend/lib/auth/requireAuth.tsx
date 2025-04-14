// lib/auth/requireAuth.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUserInformation } from '@/lib/userSlice';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const userInfo = useSelector(selectUserInformation);

    useEffect(() => {
        // If no user info is found, redirect to login
        if (!userInfo?.email) {
            router.push('/login');
        }
    }, [userInfo, router]);

    // If there's no user info, don't render anything
    // This prevents flash of protected content
    if (!userInfo?.email) {
        return null;
    }

    return <>{children}</>;
}