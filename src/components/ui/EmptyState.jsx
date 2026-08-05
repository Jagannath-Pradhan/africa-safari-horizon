import Button from './Button'

export default function EmptyState({
  title,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white py-20 text-center">
      <div className="text-5xl">
        📍
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {description}
      </p>

      <Button
        className="mt-6"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  )
}