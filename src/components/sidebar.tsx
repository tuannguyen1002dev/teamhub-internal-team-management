// app/dashboard/page.tsx
import React from 'react'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6 font-bold text-xl">MyDashboard</div>
      <nav>
        <ul className="space-y-2 px-4">
          <li><a href="#" className="block py-2 px-3 rounded hover:bg-gray-200">Dashboard</a></li>
          <li><a href="#" className="block py-2 px-3 rounded hover:bg-gray-200">Reports</a></li>
        </ul>
      </nav>
    </aside>
  )
}
