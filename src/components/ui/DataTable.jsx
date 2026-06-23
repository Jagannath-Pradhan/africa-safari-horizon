export default function DataTable({
  columns,
  data,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="text-left p-4"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data}
        </tbody>
      </table>
    </div>
  )
}