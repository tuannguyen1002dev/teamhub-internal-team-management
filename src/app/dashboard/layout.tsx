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
    // <div className="flex h-screen w-screen bg-gradient-to-b from-black via-[#2c0a72] to-purple-600 text-white overflow-hidden">
    //   <aside className="hidden md:block md:w-64 bg-[#1e1e2f] p-5 shadow-lg">
    //     <Sidebar />
    //   </aside>

    //   <div className="flex flex-col flex-1">
    //     <div className="md:hidden p-4 bg-[#1e1e2f]">
    //       <button className="text-sm px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded">Open Menu</button>
    //     </div>

    //     <header className="p-4 bg-[#1a1a2b] shadow-md">
    //       <Navbar />
    //     </header>

    //     <main className="flex-1 overflow-y-auto bg-white bg-opacity-5 backdrop-blur-md p-6 rounded-t-2xl md:rounded-none">
    //       {children}
    //     </main>
    //   </div>
    // </div>
    <div className="h-screen w-screen bg-white p-6 grid grid-cols-12 gap-6">
      <div className="w-100 col-span-3 bg-amber-500">
        {/* <Sidebar /> */}
      </div>
      <div className="w-100 col-span-full bg-violet-500">
        {/* <Navbar /> */}
      </div>
    </div>
  )
}
