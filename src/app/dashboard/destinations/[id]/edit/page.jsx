import PageHeader from '@/components/ui/PageHeader'
import DestinationForm from '@/components/destination/DestinationForm'

export default function EditDestinationPage() {
  return (
    <>
      <PageHeader
        title="Edit Destination"
        description="Update destination details."
      />

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <DestinationForm />
      </div>
    </>
  )
}