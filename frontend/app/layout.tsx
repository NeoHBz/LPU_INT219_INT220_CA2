import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "FitTrack Pro - Fitness Center Management System",
    description: "Comprehensive gym management solution for fitness centers",

}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning>
                <StoreProvider>
                    <div className="flex min-h-screen flex-col">
                        <main className="flex-1">{children}</main>
                    </div>
                </StoreProvider>
            </body>
        </html>
    );
}

import './globals.css'
import StoreProvider from "@/app/StoreProvider"
import dynamic from "next/dynamic"

