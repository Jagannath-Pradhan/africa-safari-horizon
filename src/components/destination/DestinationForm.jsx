'use client'

import InputField from '@/components/forms/InputField'
import TextAreaField from '@/components/forms/TextAreaField'

export default function DestinationForm() {
  return (
    <form className="space-y-6">
      <InputField
        label="Destination Name"
        placeholder="Serengeti"
      />

      <InputField
        label="Slug"
        placeholder="serengeti"
      />

      <InputField
        label="Country"
        placeholder="Tanzania"
      />

      <InputField
        label="Region"
        placeholder="Northern Tanzania"
      />

      <TextAreaField
        label="Description"
      />

      <div>
        <label className="block mb-2 font-medium">
          Featured Image
        </label>

        <input type="file" />
      </div>

      <button
        type="submit"
        className="bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        Save Destination
      </button>
    </form>
  )
}