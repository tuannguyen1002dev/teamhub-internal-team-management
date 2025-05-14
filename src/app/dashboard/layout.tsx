// app/dashboard/layout.tsx
import React from 'react'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-y-auto bg-gray-50 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
