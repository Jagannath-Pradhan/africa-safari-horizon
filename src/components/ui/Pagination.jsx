import Link from 'next/link'

export default function Pagination({
  page,
  totalPages,
  searchParams,
}) {
  if (totalPages <= 1) {
    return null
  }

  const createUrl = (pageNumber) => {
    const params = new URLSearchParams(
      searchParams
    )

    params.set(
      'page',
      pageNumber.toString()
    )

    return `?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-between border-t px-4 py-4">
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        {page > 1 && (
          <Link
            href={createUrl(page - 1)}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Previous
          </Link>
        )}

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        )
          .slice(
            Math.max(0, page - 3),
            Math.min(totalPages, page + 2)
          )
          .map((pageNumber) => (
            <Link
              key={pageNumber}
              href={createUrl(pageNumber)}
              className={`rounded-lg px-3 py-2 text-sm ${
                pageNumber === page
                  ? 'bg-green-700 text-white'
                  : 'border hover:bg-gray-50'
              }`}
            >
              {pageNumber}
            </Link>
          ))}

        {page < totalPages && (
          <Link
            href={createUrl(page + 1)}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}