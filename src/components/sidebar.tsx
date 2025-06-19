'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
// ** import icons
import { ChevronDown, ChevronRight, ChevronUp, LayoutDashboard, Mail, User } from 'lucide-react'

// !! Nav types
import { NavGroup, NavLink, NavSectionTitle, VerticalNavItemsType } from '@/types/structure/NavBar'

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
  { sectionTitle: 'Users section' },
  { title: 'User', icon: User, path: '/user' },
  { title: 'Email', icon: Mail, path: '/apps/email' },
]

function isNavSectionTitle(item: any): item is NavSectionTitle {
  return (item as NavSectionTitle).sectionTitle !== undefined
}

function isNavGroup(item: any): item is NavGroup {
  return (item as NavGroup).children !== undefined
}

export function NavbarItem(props: { sideBarState: boolean }) {
  const { sideBarState } = props
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({})
  const router = useRouter()

  const toggleGroup = (index: number) => {
    setExpandedGroups(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className={`flex-1 flex flex-col gap-3 select-none transition-all duration-500 ease-in-out ${sideBarState ? 'justify-center items-center w-0' : 'justify-center items-start w-40'}`}>
      {navigation.map((items, index: number) => {
        if (isNavSectionTitle(items)) {
          return (
            <div key={index}>
              {!sideBarState ? (
                <div className="flex flex-row justify-center items-center gap-1 mt-3">
                  <span className="w-[20px] h-[1px] bg-white" />
                  <span className="font-semibold text-md">{items.sectionTitle}</span>
                  <span className="w-[20px] h-[1px] bg-white" />
                </div>
              ) : <div key={index} className="h-[1px] bg-white w-[30px] my-3 display-none" />}
            </div>)
        }
        if (isNavGroup(items)) {
          const isExpanded = sideBarState ? false : (expandedGroups[index] || false)
          return (
            <div key={index}>
              <button className="flex flex-row justify-start items-center gap-1 cursor-pointer" onClick={() => !sideBarState && toggleGroup(index)}>
                {items.icon && <items.icon />}
                <span className={`font-bold text-lg flex-shrink-0 transition-all duration-500 ease-in-out ${sideBarState ? 'w-0 opacity-0 overflow-hidden' : 'w-30 opacity-100 overflow-hidden'}`}  >
                  {items.title}
                </span>
                {!sideBarState && (
                  <span className="ml-auto text-white transition-transform duration-300 ease-in-out">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                )}
              </button>
              {items.children && (
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'w-auto max-h-screen opacity-100' : 'w-0 max-h-0 opacity-0'}`} style={{ maxHeight: isExpanded ? `${items.children.length * 2.5}rem` : '0' }}  >
                  {items.children.map((child, childIndex) => (
                    <div key={childIndex} className="pl-9 text-sm text-white"  >
                      {child.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        }
        return (
          <button key={index} onClick={() => { if (items.path) router.push(items.path) }} className="flex flex-row cursor-pointer">
            {items.icon && <items.icon />}
            <span className={`font-bold text-lg flex-shrink-0 transition-all duration-500 ease-in-out ${sideBarState ? 'w-0 opacity-0 overflow-hidden' : 'w-30 opacity-100 overflow-hidden'}`} >
              {items.title}
            </span>
          </button>
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
