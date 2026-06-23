import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import DataTable from '@/components/ui/DataTable'

const destinations = [
  {
    id: 1,
    name: 'Serengeti',
    country: 'Tanzania',
    status: 'Published',
  },
  {
    id: 2,
    name: 'Masai Mara',
    country: 'Kenya',
    status: 'Draft',
  },
]

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        title="Destinations"
        description="Manage safari destinations."
        buttonText="Add Destination"
        buttonLink="/dashboard/destinations/add"
      />

      <DataTable
        columns={[
          'Destination',
          'Country',
          'Status',
          'Actions',
        ]}
        data={destinations.map((item) => (
          <tr
            key={item.id}
            className="border-t"
          >
            <td className="p-4">
              {item.name}
            </td>

            <td className="p-4">
              {item.country}
            </td>

            <td className="p-4">
              {item.status}
            </td>

            <td className="p-4">
              <Link
                href={`/dashboard/destinations/${item.id}/edit`}
                className="text-green-700"
              >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      />
    </>
  )
}