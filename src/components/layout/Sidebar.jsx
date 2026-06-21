'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Map, CalendarDays, Activity, Building2, ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import clsx from 'clsx'

const menuItems = [
  {
    title: 'Destination',
    href: '/dashboard/destinations',
    icon: Map,
  },
  {
    title: 'Itinerary',
    href: '/dashboard/itineraries',
    icon: CalendarDays,
  },
  {
    title: 'Activity',
    href: '/dashboard/activities',
    icon: Activity,
  },
  {
    title: 'Accommodation',
    href: '/dashboard/accommodations',
    icon: Building2,
  },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={clsx(
        'h-screen bg-black text-white flex flex-col transition-all duration-300',
        collapsed ? 'w-20' : 'w-72'
      )}
    >
      <div className="p-5 flex items-center justify-between border-b border-gray-800">
        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold">
              Africa Safari
            </h1>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer"
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
                >
                  <Icon size={20} />

                  {!collapsed && (
                    <span>{item.title}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-800 p-4">
        {!collapsed && (
          <>
            <p className="font-medium">
              Jagannath Pradhan
            </p>

            <button className="mt-3 flex items-center gap-2 text-red-400">
              <LogOut size={18} />
              Logout
            </button>
          </>
        )}
      </div>
    </aside>
  )
}