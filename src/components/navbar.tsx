// app/dashboard/page.tsx
import React from 'react'

export default function Navbar() {
  return (
    <div className="h-[100%] w-[100%] rounded-4xl p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-stone-800">Dashboard</h1>
        <div className="font-bold text-stone-800">User</div>
      </div>
    </div>
  )
}
