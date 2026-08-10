// import PageHeader from '@/components/ui/PageHeader'
// import DestinationForm from '@/components/destination/DestinationForm'

// export default function EditDestinationPage() {
//   return (
//     <>
//       <PageHeader
//         title="Edit Destination"
//         description="Update destination details."
//       />

//       <div className="bg-white p-6 rounded-xl shadow-sm">
//         <DestinationForm />
//       </div>
//     </>
//   )
// }


import { notFound } from 'next/navigation'

import { connectDB } from '@/lib/mongodb'

import {
  getDestinationById,
} from '@/services/destination.service'

import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import DestinationForm from '@/components/destination/DestinationForm'

export default async function EditDestinationPage({
  params,
}) {
  const { id } = await params

  await connectDB()

  const destination =
    await getDestinationById(id)

  if (!destination) {
    notFound()
  }

  const serializedDestination = {
    ...destination,
    _id: destination._id.toString(),
    createdAt:
      destination.createdAt?.toISOString(),
    updatedAt:
      destination.updatedAt?.toISOString(),
  }

  return (
    <div>
      <PageHeader
        title="Edit Destination"
        description="Update destination details."
      />

      <Card className="p-6">
        <DestinationForm
          mode="edit"
          destination={serializedDestination}
        />
      </Card>
    </div>
  )
}