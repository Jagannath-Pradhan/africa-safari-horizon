export default function SectionTitle({
  title,
  description,
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="text-gray-500 mt-1">
        {description}
      </p>
    </div>
  )
}