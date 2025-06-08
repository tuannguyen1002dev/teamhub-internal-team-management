'use client'

import React, { useState } from 'react'

// ** import icons
import { ChevronDown, LayoutDashboard } from 'lucide-react'

export default function Sidebar(props: { sideBarState: boolean }) {
  const { sideBarState } = props

  return (
    <div className="flex-1 p-6">
      <div className="flex flex-col gap-3">
        <button className="flex flex-row justify-start items-center">
          <LayoutDashboard /> <span className={`font-semibold flex-shrink-0 transition-all duration-500 ease-in-out ${sideBarState ? 'w-0 opacity-0 overflow-hidden' : 'w-30 opacity-100 delay-150'}`}>Dashboard</span>
        </button>
      </div>
    </div>
  )
}
