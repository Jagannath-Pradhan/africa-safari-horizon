'use client'

import { Search, X } from 'lucide-react'
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DestinationFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const queryString = searchParams.toString()

  const currentSearch =
    searchParams.get('search') || ''

  const status =
    searchParams.get('status') || ''

  const [search, setSearch] = useState(currentSearch)

  // Keep input synchronized with URL changes
  useEffect(() => {
    setSearch(currentSearch)
  }, [currentSearch])

  // Debounced search
  useEffect(() => {
    const trimmedSearch = search.trim()

    // Prevent unnecessary navigation
    if (trimmedSearch === currentSearch) {
      return
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(queryString)

      if (trimmedSearch) {
        params.set('search', trimmedSearch)
      } else {
        params.delete('search')
      }

      params.delete('page')

      const newQuery = params.toString()
      const currentQuery = queryString

      // Navigate only when the URL actually changes
      if (newQuery === currentQuery) {
        return
      }

      const url = newQuery
        ? `${pathname}?${newQuery}`
        : pathname

      router.replace(url, { scroll: false })
    }, 400)

    return () => clearTimeout(timer)
  }, [
    search,
    currentSearch,
    queryString,
    pathname,
    router,
  ])

  // Status filter
  const handleStatusChange = (value) => {
    const params = new URLSearchParams(queryString)

    if (value) {
      params.set('status', value)
    } else {
      params.delete('status')
    }

    params.delete('page')

    const newQuery = params.toString()

    const url = newQuery
      ? `${pathname}?${newQuery}`
      : pathname

    router.replace(url, { scroll: false })
  }

  // Clear all filters
  const clearFilters = () => {
    setSearch('')
    router.replace(pathname, { scroll: false })
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
        <option value="">All Status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
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