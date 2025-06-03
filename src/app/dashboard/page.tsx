// app/dashboard/page.tsx
import React from 'react'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'

export default function DashboardPage() {


  function Card({ title, value }: any) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <div className="text-gray-500">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    );
  }

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Revenue" value="$45,000" />
        <Card title="Users" value="1,200" />
        <Card title="Sessions" value="3,300" />
      </div>
    </main>
  )
}
