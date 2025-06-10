'use client'

import React, { useState } from 'react'

// ** import icons
import { ChevronDown, LayoutDashboard, Mail } from 'lucide-react'

// !! Nav types

export type NavLink = {
  icon?: any
  path?: string
  title: string
  disabled?: boolean
  externalLink?: boolean
  openInNewTab?: boolean
}

export type NavGroup = {
  icon?: any
  title: string
  children?: (NavGroup | NavLink)[]
}

export type NavSectionTitle = {
  subject?: string
  sectionTitle: string
}

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[]

const navigation: VerticalNavItemsType = [
  {
    title: 'Dashboards',
    icon: LayoutDashboard,
    children: [
      { title: 'CRM', path: '/dashboards/crm' },
      { title: 'Analytics', path: '/dashboards/analytics' },
      { title: 'eCommerce', path: '/dashboards/ecommerce' }
    ]
  },
  { sectionTitle: 'Apps & Pages' },
  { title: 'Email', icon: Mail, path: '/apps/email' },
]



export function NavbarItem(props: { sideBarState: boolean }) {
  const { sideBarState } = props

  console.log('tuan', navigation)

  return (
    <div className="flex-1 bg-amber-800">
      {/* <button className="flex flex-row justify-start items-center">
        <LayoutDashboard /> <span className={`font-semibold flex-shrink-0 transition-all duration-500 ease-in-out ${sideBarState ? 'w-0 opacity-0 overflow-hidden' : 'w-30 opacity-100 delay-150'}`}>Dashboard</span>
      </button> */}
      {navigation.map((items, index: number) => {
        return (
          <div className="">
            <div className="">
              {'sectionTitle' in items ?
                <div className="flex flex-row justify-center items-center gap-1">
                  <span className="h-[1px] w-[20px] bg-gray-300"></span>
                  <div className="text-white text-xs font-semibold">
                    {items.sectionTitle}
                  </div>
                  <span className="h-[1px] w-[20px] bg-gray-300"></span>
                </div> :
                <div>
                  {'children' in items
                    ? <div>

                    </div>
                    : <div>
                      
                    </div>}
                </div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Sidebar(props: { sideBarState: boolean }) {
  const { sideBarState } = props

  return (
    <div className="flex-1 p-6">
      <NavbarItem sideBarState={sideBarState} />
    </div>
  )
}
