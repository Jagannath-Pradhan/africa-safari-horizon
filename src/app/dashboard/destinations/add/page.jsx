import PageHeader from '@/components/ui/PageHeader'
import DestinationForm from '@/components/destination/DestinationForm'

export default function AddDestinationPage() {
  return (
    <>
      <PageHeader
        title="Add Destination"
        description="Create a new safari destination."
      />

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <DestinationForm />
      </div>
    </>
  )
}