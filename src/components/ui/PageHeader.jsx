import Link from 'next/link'

export default function PageHeader({
  title,
  description,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="text-gray-500 mt-1">
          {description}
        </p>
      </div>

      {buttonText && (
        <Link
          href={buttonLink}
          className="px-5 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
        >
          {buttonText}
        </Link>
      )}
    </div>
  )
}