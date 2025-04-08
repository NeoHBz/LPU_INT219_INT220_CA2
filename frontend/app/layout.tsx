import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { MainNav } from "@/components/main-nav"

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
        <div className="flex min-h-screen flex-col">
          <MainNav />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}



import './globals.css'