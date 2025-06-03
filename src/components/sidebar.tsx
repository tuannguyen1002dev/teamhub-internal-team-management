// app/dashboard/page.tsx
import React from 'react'

export default function Sidebar() {
  return (
    <aside className=" bg-gray-950 p-3 flex flex-col gap-3 rounded-2xl">
      <div className=" flex justify-center items-cente p-2">
        <div className="text-2xl font-bold text-violet-800">TeamHub</div>
      </div>
      <nav>
        <ul className="space-y-2 px-4">
          <li><a href="#" className="block py-2 px-3 rounded hover:bg-gray-200">Dashboard</a></li>
          <li><a href="#" className="block py-2 px-3 rounded hover:bg-gray-200">Reports</a></li>
        </ul>
      </nav>
    </aside>
  )
}
