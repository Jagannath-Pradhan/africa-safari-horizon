// import Link from 'next/link'
// import PageHeader from '@/components/ui/PageHeader'
// import DataTable from '@/components/ui/DataTable'

// const destinations = [
//   {
//     id: 1,
//     name: 'Serengeti',
//     country: 'Tanzania',
//     status: 'Published',
//   },
//   {
//     id: 2,
//     name: 'Masai Mara',
//     country: 'Kenya',
//     status: 'Draft',
//   },
// ]

// export default function DestinationsPage() {
//   return (
//     <>
//       <PageHeader
//         title="Destinations"
//         description="Manage safari destinations."
//         buttonText="Add Destination"
//         buttonLink="/dashboard/destinations/add"
//       />

//       <DataTable
//         columns={[
//           'Destination',
//           'Country',
//           'Status',
//           'Actions',
//         ]}
//         data={destinations.map((item) => (
//           <tr
//             key={item.id}
//             className="border-t"
//           >
//             <td className="p-4">
//               {item.name}
//             </td>

//             <td className="p-4">
//               {item.country}
//             </td>

//             <td className="p-4">
//               {item.status}
//             </td>

//             <td className="p-4">
//               <Link
//                 href={`/dashboard/destinations/${item.id}/edit`}
//                 className="text-green-700"
//               >
//                 Edit
//               </Link>
//             </td>
//           </tr>
//         ))}
//       />
//     </>
//   )
// }







// import Link from 'next/link'
// import PageHeader from '@/components/ui/PageHeader'
// import DataTable from '@/components/ui/DataTable'
// import { getDestinations } from '@/services/destination.service'
// import { connectDB } from '@/lib/mongodb'

// // const destinations = [
// //   {
// //     id: 1,
// //     name: 'Serengeti',
// //     country: 'Tanzania',
// //     status: 'Published',
// //   },
// //   {
// //     id: 2,
// //     name: 'Masai Mara',
// //     country: 'Kenya',
// //     status: 'Draft',
// //   },
// // ]

// export default async function DestinationsPage() {
//   await connectDB()
//   const destinations = await getDestinations()

//   return (
//     <>
//       <PageHeader
//         title="Destinations"
//         description="Manage safari destinations."
//         buttonText="Add Destination"
//         buttonLink="/dashboard/destinations/add"
//       />

//       <DataTable
//         columns={[
//           'Destination',
//           'Country',
//           'Status',
//           'Actions',
//         ]}
//         data={destinations.map((item) => (
//           <tr
//             key={item.id}
//             className="border-t"
//           >
//             <td className="p-4">
//               {item.name}
//             </td>

//             <td className="p-4">
//               {item.country}
//             </td>

//             <td className="p-4">
//               {item.status}
//             </td>

//             <td className="p-4">
//               <Link
//                 href={`/dashboard/destinations/${item.id}/edit`}
//                 className="text-green-700"
//               >
//                 Edit
//               </Link>
//             </td>
//           </tr>
//         ))}
//       />
//     </>
//   )
// }





import Link from 'next/link'
import { Pencil, Plus } from 'lucide-react'

import { connectDB } from '@/lib/mongodb'
import {
  getDestinations,
} from '@/services/destination.service'

import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import DeleteDestinationButton from '@/components/destination/DeleteDestinationButton'
import DestinationFilters from '@/components/destination/DestinationFilters'
import Pagination from '@/components/ui/Pagination'

// export default async function DestinationsPage({
//   searchParams
// }) {
//   const params = await searchParams

//   const search = params.search || ''
//   const status = params.status || ''

//   await connectDB()
export default async function DestinationsPage({
  searchParams,
}) {
  const params = await searchParams

  const search = params.search || ''
  const status = params.status || ''

  const pageNumber = Number(params.page) || 1

  await connectDB()

  const result = await getDestinations({
    search,
    status,
    page: pageNumber,
    limit: 10,
  })

  const {
    destinations,
    total,
    page,
    totalPages,
  } = result

  // const destinations =
  //   await getDestinations({ search, status })

  return (
    <div>
      <PageHeader
        title="Destinations"
        description="Manage safari destinations."
        buttonText="Add Destination"
        buttonLink="/dashboard/destinations/add"
      />

      <DestinationFilters />

      <Card>
        {destinations.length === 0 ? (
          <div className="p-12 text-center">
            <h2 className="text-xl font-semibold">
              No destinations found
            </h2>

            <p className="mt-2 text-gray-500">
              Create your first safari destination.
            </p>

            <Link
              href="/dashboard/destinations/add"
              className="inline-flex items-center gap-2 mt-6 bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <Plus size={18} />

              Add Destination
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4">
                    Destination
                  </th>

                  <th className="text-left p-4">
                    Country
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-right p-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {destinations.map(
                  (destination) => (
                    <tr
                      key={destination._id.toString()}
                      className="border-b last:border-0"
                    >
                      <td className="p-4 font-medium">
                        {destination.name}
                      </td>

                      <td className="p-4 text-gray-600">
                        {destination.country}
                      </td>

                      <td className="p-4">
                        <Badge
                          variant={
                            destination.status ===
                              'published'
                              ? 'success'
                              : 'warning'
                          }
                        >
                          {destination.status}
                        </Badge>
                      </td>

                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/destinations/${destination._id}/edit`}
                            className="rounded-lg p-2 hover:bg-gray-100"
                            title="Edit destination"
                          >
                            <Pencil size={18} />
                          </Link>

                          <DeleteDestinationButton
                            id={destination._id.toString()}
                            name={destination.name}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      <Pagination
        page={page}
        totalPages={totalPages}
        searchParams={params}
      />
    </div>
  )
}