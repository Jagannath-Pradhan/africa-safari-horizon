'use client'

import { Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DestinationFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(
    searchParams.get('search') || ''
  )

  const status =
    searchParams.get('status') || ''

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(
        searchParams.toString()
      )

      if (search.trim()) {
        params.set('search', search.trim())
      } else {
        params.delete('search')
      }

      params.delete('page')

      router.push(
        `${pathname}?${params.toString()}`
      )
    }, 400)

    return () => clearTimeout(timer)
  }, [
    search,
    pathname,
    router,
    searchParams,
  ])

  const handleStatusChange = (value) => {
    const params = new URLSearchParams(
      searchParams.toString()
    )

    if (value) {
      params.set('status', value)
    } else {
      params.delete('status')
    }

    params.delete('page')

    router.push(
      `${pathname}?${params.toString()}`
    )
  }

  const clearFilters = () => {
    router.push(pathname)
  }

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 md:flex-row">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search destinations..."
          className="w-full rounded-lg border py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <select
        value={status}
        onChange={(event) =>
          handleStatusChange(event.target.value)
        }
        className="rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-600"
      >
        <option value="">
          All Status
        </option>

        <option value="published">
          Published
        </option>

        <option value="draft">
          Draft
        </option>
      </select>

      {(search || status) && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-gray-600 hover:bg-gray-100"
        >
          <X size={18} />
          Clear
        </button>
      )}
    </div>
  )
}