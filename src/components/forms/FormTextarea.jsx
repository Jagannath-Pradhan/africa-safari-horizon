export default function FormTextarea({
  label,
  error,
  ...props
}) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <textarea
        {...props}
        rows={5}
        className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}