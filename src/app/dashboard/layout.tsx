'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'

// ** import icons
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {

  const [sideBarState, setSideBarState] = useState<boolean>(false)

  function switchSideBarSate() {
    return setSideBarState(!sideBarState)
  }

  return (
    <div className="h-screen w-screen flex flex-row gap-6 p-6 bg-black/40">
      <div className="flex-1 rounded-3xl transition-all duration-500 ease-in-out h-[100%]">
        <div className="relative flex flex-row gap-3 justify-center items-center">
          <div className={` flex-shrink-0 transition-all duration-500 ease-in-out ${sideBarState ? 'w-0 opacity-0 overflow-hidden' : 'w-40 opacity-100 overflow-hidden'}`}>
            <div className="text-2xl font-bold text-white text-center p-3">TeamHub</div>
          </div>
          <div className={`flex-1 flex justify-center item-center p-3 transform ${sideBarState ? 'translate-x-[-10%] translate-y-[0%] overflow-hidden' : 'translate-x-[-10%] translate-y-[0%] overflow-hidden'}`}>
            <button className="flex justify-center items-center shadow-2xs rounded-4xl p-1" onClick={() => switchSideBarSate()}>
              <ChevronLeft />
            </button>
          </div>
        </div>
        <Sidebar sideBarState={sideBarState} />
      </div>
      <div className={`bg-black/90 rounded-3xl transition-all duration-500 ease-in-out ${sideBarState ? 'flex-20' : 'flex-5'}`}>
        <div className="w-[100%] h-[100%]">
          <Navbar />
          <div>
            {children}
          </div>
        </div>
      </div>
    </div >
  )
}
