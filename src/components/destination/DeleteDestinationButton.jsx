'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import ConfirmDialog from '@/components/ui/ConfirmDialog'

import {
  deleteDestinationAction,
} from '@/app/actions/destination.actions'
import { useRouter } from 'next/navigation'

export default function DeleteDestinationButton({
  id,
  name,
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  

  const handleDelete = async () => {
    setLoading(true)

    try {
      const result =
        await deleteDestinationAction(id)

      if (!result.success) {
        toast.error(result.message)
        return
      }

      toast.success(result.message)

      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)

      toast.error(
        'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-red-600 hover:bg-red-50 cursor-pointer"
        title="Delete destination"
      >
        <Trash2 size={18} />
      </button>

      <ConfirmDialog
        open={open}
        title="Delete Destination?"
        description={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={loading}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!loading) {
            setOpen(false)
          }
        }}
      />
    </>
  )
}