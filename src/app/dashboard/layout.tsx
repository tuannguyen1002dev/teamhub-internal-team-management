'use client'

import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar'
import { ChevronLeft, User } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { PageTitleProvider } from '@/contexts/PageTitleProvider'

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
      {/* Animation Layer */}
      {/* <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path fill="url(#waveGradient)" fillOpacity="1">
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="M0,160 C480,100 960,220 1440,160 L1440,320 L0,320 Z;M0,180 C480,220 960,100 1440,180 L1440,320 L0,320 Z;M0,160 C480,100 960,220 1440,160 L1440,320 L0,320 Z"
              keyTimes="0; 0.5; 1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
            />
          </path>
        </svg>
      </div> */}

      {/* Contents layer */}
      <div className="relative h-screen w-screen flex flex-row gap-6 p-6 bg-transparent">
        <div className={`rounded-3xl ${animationClasses} h-[100%] ${sideBarState ? 'w-[5%]' : 'w-[12%]'}`}>
          <div className={`relative flex flex-row justify-center items-center ${animationClasses} ${sideBarState ? 'gap-0' : 'gap-3'}`}>
            <div className={`flex-shrink-0 ${animationClasses} ${sideBarState ? 'w-0 opacity-0 overflow-hidden' : 'w-40 opacity-100 overflow-hidden'}`}>
              <div className="text-2xl font-bold text-white text-center p-3">TeamHub</div>
            </div>
            <div className={`${animationClasses} transform ${sideBarState ? 'translate-x-[0%] translate-y-[0%] overflow-hidden' : 'translate-x-[100%] translate-y-[0%] overflow-hidden'}`}>
              <button className="flex justify-center items-center shadow-2xs rounded-4xl p-1" onClick={() => switchSideBarSate()}>
                <ChevronLeft />
              </button>
            </div>
          </div>
          <Sidebar sideBarState={sideBarState} />
        </div>
        <div className={`flex bg-black/30 backdrop-blur-md rounded-3xl ${animationClasses} h-[100%] ${sideBarState ? 'w-[95%]' : 'w-[88%]'}`}>
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row justify-between items-center px-6 py-3 rounded-t-3xl border-b border-white/20">
              <span className="text-2xl font-bold text-white">

              </span>
              <div className="border border-white/20 rounded-full p-2 text-white hover:bg-white/90 hover:text-black transition-all duration-500 ease-in-out cursor-pointer  ">
                <User />
              </div>
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
