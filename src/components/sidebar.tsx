'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
// ** import icons
import { ChevronDown, ChevronRight, ChevronUp, LayoutDashboard, Mail, User } from 'lucide-react'

// !! Nav types
import { NavGroup, NavLink, NavSectionTitle, VerticalNavItemsType } from '@/types/structure/NavBar'

const animationClasses = "transform transition-all duration-500 ease-in-out";

// const navigation: VerticalNavItemsType = [
//   {
//     title: 'Dashboards',
//     icon: LayoutDashboard,
//     children: [
//       { title: 'Overview', path: '/dashboard' },
//       { title: 'Invitation', path: '/dashboard/invitation' },
//     ]
//   },
//   { sectionTitle: 'Users section' },
//   { title: 'User', icon: User, path: '/dashboard/user' },
//   { title: 'Email', icon: Mail, path: '/apps/email' },
// ]

function isNavSectionTitle(item: any): item is NavSectionTitle {
  return (item as NavSectionTitle).sectionTitle !== undefined
}

function isNavGroup(item: any): item is NavGroup {
  return (item as NavGroup).children !== undefined
}

export function NavbarItem(props: { sideBarState: boolean, registryItems: VerticalNavItemsType }) {
  const { sideBarState, registryItems } = props
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({})
  const router = useRouter()

  const toggleGroup = (index: number) => {
    setExpandedGroups(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className={`flex-1 flex flex-col gap-3 select-none ${animationClasses} ${sideBarState ? 'justify-center items-center w-0' : 'justify-center items-start w-40'}`}>
      {registryItems.map((items, index: number) => {
        if (isNavSectionTitle(items)) {
          return (
            <div key={index} className="w-full">
              <div className="flex flex-row justify-center items-center gap-0 mt-3 w-full">
                <span className="w-[40%] h-[1px] bg-white" />
                <span className={`font-semibold text-md text-center ${animationClasses} ${sideBarState ? 'w-[0%] overflow-hidden opacity-0 whitespace-nowrap' : 'w-[100%] overflow-hidden opacity-100 whitespace-nowrap'}`}>{items.sectionTitle}</span>
                <span className="w-[40%] h-[1px] bg-white" />
              </div>
            </div>
          )
        }
        if (isNavGroup(items)) {
          const isExpanded = sideBarState ? false : (expandedGroups[index] || false)
          return (
            <div key={index} className="w-full flex flex-col gap-2">
              <button className="flex flex-row justify-center items-center gap-1 cursor-pointer p-2 rounded-md hover:bg-gray-700 transition-all duration-500 ease-in-out transform hover:scale-105 w-full"
                onClick={() => {
                  const firstChild = items.children?.[0]
                  if (firstChild && 'path' in firstChild) {
                    !sideBarState
                      ? toggleGroup(index)
                      : router.push(items.children && Object(firstChild).path)
                  }
                }
                } >
                {items.icon && <items.icon className="text-white" />}
                <span className={`font-bold text-lg flex-shrink-0 ${animationClasses} ${sideBarState ? 'w-0 opacity-0 overflow-hidden' : 'w-30 opacity-100 overflow-hidden'}`}  >
                  {items.title}
                </span>
                {!sideBarState && (
                  <span className={`ml-auto text-white transform ${animationClasses} ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown size={16} />
                  </span>
                )}
              </button>
              {items.children && (
                <div className={`flex flex-col gap-2 ${animationClasses} ${isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'}`} style={{ maxHeight: isExpanded ? `${items.children.length * 2.5}rem` : '0' }}   >
                  {items.children.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      className={`py-1 pl-11 text-left text-sm text-white rounded-md cursor-pointer hover:bg-gray-700/50 transform hover:scale-105`}
                      style={{
                        transform: isExpanded ? 'translateY(0)' : `translateY(${(childIndex + 1) * -2.5}rem)`,
                        opacity: isExpanded ? 100 : 0,
                        transition: `all ${(childIndex + 1) * 150}ms ease-in-out`,
                        transitionDelay: isExpanded ? `0 ms` : `${(childIndex + 10) + 100} ms`, // Add delay based on child index
                      }}
                      onClick={() => { if ('path' in child && child.path) router.push(child.path) }}
                    >
                      {child.title}
                    </div>
                  ))}
                </div>
              )
              }
            </div>
          )
        }
        return (
          <button key={index} onClick={() => { if (items.path) router.push(items.path) }} className="flex flex-row cursor-pointer p-2 rounded-md hover:bg-gray-700 transition-all duration-500 ease-in-out transform hover:scale-105 w-full justify-center items-center"  >
            {items.icon && <items.icon className="text-white" />}
            <span className={` font-bold text-lg flex-shrink-0 transition-all duration-500 ease-in-out ${sideBarState ? 'w-0 opacity-0 overflow-hidden' : 'w-30 opacity-100 overflow-hidden'}`}>
              {items.title}
            </span>
          </button>
        )
      })}
    </div >
  )
}

export default function Sidebar(props: { sideBarState: boolean, registryItems: VerticalNavItemsType }) {
  const { sideBarState, registryItems } = props

  return (
    <div className="flex flex-row justify-center items-center p-3 w-[100%]">
      <NavbarItem sideBarState={sideBarState} registryItems={registryItems} />
    </div>
  )
}
