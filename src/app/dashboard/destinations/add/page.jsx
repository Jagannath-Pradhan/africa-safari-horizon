// import PageHeader from '@/components/ui/PageHeader'
// import DestinationForm from '@/components/destination/DestinationForm'

// export default function AddDestinationPage() {
//   return (
//     <>
//       <PageHeader
//         title="Add Destination"
//         description="Create a new safari destination."
//       />

//       <div className="bg-white p-6 rounded-xl shadow-sm">
//         <DestinationForm />
//       </div>
//     </>
//   )
// }









import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import DestinationForm from '@/components/destination/DestinationForm'

export default function AddDestinationPage() {
  return (
    <>
      <PageHeader
        title="Add Destination"
        description="Create a new safari destination."
      />

      <Card className="p-6">
        <DestinationForm />
      </Card>
    </>
  )
}