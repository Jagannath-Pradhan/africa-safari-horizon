'use client'

import { useEffect, useRef, useState } from 'react'
import { ImagePlus, Trash2, Upload } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

export default function ImageUpload({
  label,
  multiple = false,
  onChange,
  maxFiles = 10,
}) {
  const inputRef = useRef(null)
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview)
      })
    }
  }, [files])

  const handleChange = (event) => {
    const selectedFiles = Array.from(
      event.target.files || []
    )

    setError('')

    const validFiles = []

    for (const file of selectedFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError('Only JPG, PNG and WEBP images are allowed.')
        continue
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('Each image must be smaller than 5MB.')
        continue
      }

      validFiles.push(file)
    }

    const newFiles = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }))

    const updatedFiles = multiple
      ? [...files, ...newFiles].slice(0, maxFiles)
      : newFiles.slice(0, 1)

    if (!multiple) {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview)
      })
    }

    if (multiple) {
      newFiles
        .slice(Math.max(0, maxFiles - files.length))
        .forEach((file) => {
          URL.revokeObjectURL(file.preview)
        })
    }

    setFiles(updatedFiles)
    onChange?.(updatedFiles.map((item) => item.file))

    event.target.value = ''
  }

  const removeFile = (id) => {
    const removedFile = files.find(
      (file) => file.id === id
    )

    if (removedFile) {
      URL.revokeObjectURL(removedFile.preview)
    }

    const updatedFiles = files.filter(
      (file) => file.id !== id
    )

    setFiles(updatedFiles)
    onChange?.(updatedFiles.map((item) => item.file))
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        {label}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition hover:border-green-600 hover:bg-green-50"
      >
        <Upload size={26} className="text-gray-500" />

        <p className="mt-3 text-sm font-medium">
          Click to upload images
        </p>

        <p className="mt-1 text-xs text-gray-500">
          JPG, PNG or WEBP · Maximum 5MB per image
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="group relative overflow-hidden rounded-xl border"
            >
              <img
                src={file.preview}
                alt={file.file.name}
                className="h-36 w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="absolute right-2 top-2 rounded-lg bg-white p-2 text-red-600 shadow hover:bg-red-50"
                aria-label={`Remove ${file.file.name}`}
              >
                <Trash2 size={16} />
              </button>

              <p className="truncate p-2 text-xs text-gray-600">
                {file.file.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {multiple && (
        <p className="text-xs text-gray-500">
          {files.length} / {maxFiles} images selected
        </p>
      )}
    </div>
  )
}