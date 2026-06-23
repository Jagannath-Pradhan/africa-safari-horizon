export default function TextAreaField({
  label,
  ...props
}) {
  return (
    <div>
      <label className="block mb-2 font-medium">
        {label}
      </label>

      <textarea
        {...props}
        rows={5}
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>
  )
}