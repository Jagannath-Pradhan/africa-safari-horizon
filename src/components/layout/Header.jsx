'use client'

import { Bell, Search } from 'lucide-react'

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Left */}

      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full border rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        <button>
          <Bell size={22} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center">
            JP
          </div>

          <div>
            <p className="font-medium">
              Jagannath
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}