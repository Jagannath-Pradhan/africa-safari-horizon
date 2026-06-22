// export default function DashboardPage() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold">
//         Africa Safari Admin
//       </h1>

//       <p className="mt-2 text-gray-600">
//         Manage destinations, itineraries, activities and accommodations.
//       </p>
//     </div>
//   )
// }





import StatsCard from '@/components/dashboard/StatsCard'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Africa Safari Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Overview of your safari content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        <StatsCard
          title="Destinations"
          value="12"
        />

        <StatsCard
          title="Itineraries"
          value="45"
        />

        <StatsCard
          title="Activities"
          value="88"
        />

        <StatsCard
          title="Accommodations"
          value="21"
        />
      </div>
    </div>
  )
}