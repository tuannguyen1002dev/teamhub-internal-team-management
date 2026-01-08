'use client'

import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar'
import { ChevronLeft, User } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { PageTitleProvider } from '@/contexts/PageTitleProvider'
import { getSidebarItems } from './sidebarProjection'

// Define reusable animation classes
const animationClasses = "transition-all duration-500 ease-in-out";

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {

  const router = useRouter()
  const pathname = usePathname();
  const [sideBarState, setSideBarState] = useState<boolean>(false)

  function switchSideBarSate() {
    return setSideBarState(!sideBarState)
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gray-700/50">
      {/* Contents layer */}
      <div className="relative h-screen w-screen flex flex-row gap-6 p-6 bg-transparent">
        <div className={`rounded-3xl ${animationClasses} h-[100%] ${sideBarState ? 'w-[10%]' : 'w-[20%]'} bg-black/30 backdrop-blur-md p-3`}>
          <div className={`relative flex flex-row justify-center items-center ${animationClasses} ${sideBarState ? 'gap-0' : 'gap-3'}`}>
            <div className={`flex-shrink-0 ${animationClasses} ${sideBarState ? 'w-0 opacity-0 overflow-hidden' : 'w-40 opacity-100 overflow-hidden'}`}>
              <div className="text-2xl font-bold text-white p-3">TeamHub</div>
            </div>
            <div className={`${animationClasses} ${sideBarState ? 'translate-x-[0%] translate-y-[0%] overflow-hidden' : 'translate-x-[00%] translate-y-[0%] overflow-hidden'}`}>
              <button className={`${animationClasses} hover:bg-gray-700 rounded-xl p-2 ${sideBarState ? 'rotate-180' : 'rotate-0'}`} onClick={() => switchSideBarSate()}>
                <ChevronLeft />
              </button>
            </div>
          </div>
          <Sidebar sideBarState={sideBarState} registryItems={getSidebarItems()} />
        </div>
        <div className={`flex bg-black/30 backdrop-blur-md rounded-3xl ${animationClasses} h-[100%] ${sideBarState ? 'w-[90%]' : 'w-[80%]'}`}>
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row justify-between items-center px-6 py-3 rounded-t-3xl border-b border-white/20">
              <span className="text-2xl font-bold text-white">
              </span>
              <button className={` ${animationClasses} border border-white/30 rounded-xl p-2 text-white hover:bg-gray-700`} onClick={() => router.push('/login')}>
                <User />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-6 pt-3">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
