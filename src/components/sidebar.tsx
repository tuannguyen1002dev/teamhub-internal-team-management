'use client'

import React, { useState } from 'react'

// ** import icons
import { ChevronDown, ChevronRight, ChevronUp, LayoutDashboard, Mail } from 'lucide-react'

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

function isNavSectionTitle(item: any): item is NavSectionTitle {
  return (item as NavSectionTitle).sectionTitle !== undefined
}

function isNavGroup(item: any): item is NavGroup {
  return (item as NavGroup).children !== undefined
}

export function NavbarItem(props: { sideBarState: boolean }) {
  const { sideBarState } = props
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({})

  const toggleGroup = (index: number) => {
    setExpandedGroups(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="flex-1 flex flex-col gap-3">
      {navigation.map((items, index: number) => {
        if (isNavSectionTitle(items)) {
          return (
            <div key={index} className="flex flex-row justify-center items-center gap-1 mt-3">
              <span className="w-[20px] h-[1px] bg-white" />
              <span className="font-semibold text-md">{items.sectionTitle}</span>
              <span className="w-[20px] h-[1px] bg-white" />
            </div>
          )
        }
        if (isNavGroup(items)) {
          const isExpanded = expandedGroups[index] || false
          return (
            <div key={index}>
              <div className="flex flex-row justify-start items-center gap-1 cursor-pointer" onClick={() => toggleGroup(index)}>
                {items.icon && <items.icon />}
                <span className={`font-bold text-lg flex-shrink-0 transition-all duration-500 ease-in-out ${sideBarState ? 'w-0 opacity-0 overflow-hidden' : 'w-30 opacity-100 delay-150'}`}  >
                  {items.title}
                </span>
                <span className="ml-auto text-white transition-transform duration-300 ease-in-out">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </div>
              {isExpanded &&
                items.children &&
                items.children.map((child, childIndex) => (
                  <div key={childIndex} className="pl-6 text-sm text-white">
                    {child.title}
                  </div>
                ))}
            </div>
          )
        }
        return (
          <div key={index} className="flex items-center gap-1">
            {items.icon && <items.icon />}
            <span className={`font-bold text-lg flex-shrink-0 transition-all duration-500 ease-in-out ${sideBarState ? 'w-0 opacity-0 overflow-hidden' : 'w-30 opacity-100 delay-150'}`} >
              {items.title}
            </span>
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
