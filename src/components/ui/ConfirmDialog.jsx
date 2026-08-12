'use client'

import { AlertTriangle, X } from 'lucide-react'

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  description,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle
                size={20}
                className="text-red-600"
              />
            </div>

            <h2 className="text-lg font-semibold">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-sm leading-6 text-gray-600">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? 'Deleting...'
              : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}