export default function InputField({
  label,
  ...props
}) {
  return (
    <div>
      <label className="block mb-2 font-medium">
        {label}
      </label>

      <input
        {...props}
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>
  )
}