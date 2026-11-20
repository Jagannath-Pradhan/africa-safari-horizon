// 'use client'

// import InputField from '@/components/forms/InputField'
// import TextAreaField from '@/components/forms/TextAreaField'

// export default function DestinationForm() {
//   return (
//     <form className="space-y-6">
//       <InputField
//         label="Destination Name"
//         placeholder="Serengeti"
//       />

//       <InputField
//         label="Slug"
//         placeholder="serengeti"
//       />

//       <InputField
//         label="Country"
//         placeholder="Tanzania"
//       />

//       <InputField
//         label="Region"
//         placeholder="Northern Tanzania"
//       />

//       <TextAreaField
//         label="Description"
//       />

//       <div>
//         <label className="block mb-2 font-medium">
//           Featured Image
//         </label>

//         <input type="file" />
//       </div>

//       <button
//         type="submit"
//         className="bg-green-700 text-white px-6 py-3 rounded-lg"
//       >
//         Save Destination
//       </button>
//     </form>
//   )
// }



// 'use client'

// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'

// import { destinationSchema } from '@/validations/destination.schema'

// import FormInput from '@/components/forms/FormInput'
// import FormTextarea from '@/components/forms/FormTextarea'
// import FormSelect from '@/components/forms/FormSelect'

// export default function DestinationForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(destinationSchema),

//     defaultValues: {
//       status: 'draft',
//       featured: false,
//     },
//   })

//   const onSubmit = (data) => {
//     console.log(data)
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-6"
//     >
//       <FormInput
//         label="Destination Name"
//         {...register('name')}
//         error={errors.name?.message}
//       />

//       <FormInput
//         label="Slug"
//         {...register('slug')}
//         error={errors.slug?.message}
//       />

//       <FormInput
//         label="Country"
//         {...register('country')}
//         error={errors.country?.message}
//       />

//       <FormInput
//         label="Region"
//         {...register('region')}
//         error={errors.region?.message}
//       />

//       <FormTextarea
//         label="Short Description"
//         {...register('shortDescription')}
//         error={
//           errors.shortDescription?.message
//         }
//       />

//       <FormTextarea
//         label="Description"
//         {...register('description')}
//         error={
//           errors.description?.message
//         }
//       />

//       <FormInput
//         label="SEO Title"
//         {...register('seoTitle')}
//       />

//       <FormTextarea
//         label="SEO Description"
//         {...register('seoDescription')}
//       />

//       <FormSelect
//         label="Status"
//         {...register('status')}
//       >
//         <option value="draft">
//           Draft
//         </option>

//         <option value="published">
//           Published
//         </option>
//       </FormSelect>

//       <div className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register('featured')}
//         />

//         <label>
//           Featured Destination
//         </label>
//       </div>

//       <button
//         type="submit"
//         className="bg-green-700 text-white px-6 py-3 rounded-lg"
//       >
//         Save Destination
//       </button>
//     </form>
//   )
// }





'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
  destinationSchema,
} from '@/validations/destination.schema'

import {
  createDestinationAction,
  updateDestinationAction,
} from '@/app/actions/destination.actions'

import FormInput from '@/components/forms/FormInput'
import FormTextarea from '@/components/forms/FormTextarea'
import FormSelect from '@/components/forms/FormSelect'
import Button from '@/components/ui/Button'
import ImageUpload from '../forms/ImageUpload'

export default function DestinationForm({
  mode = 'create',
  destination = null,
}) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [featuredFile, setFeaturedFile] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(destinationSchema),

    defaultValues: {
      name: destination?.name || '',
      slug: destination?.slug || '',
      country: destination?.country || '',
      region: destination?.region || '',
      shortDescription:
        destination?.shortDescription || '',
      description:
        destination?.description || '',
      seoTitle: destination?.seoTitle || '',
      seoDescription:
        destination?.seoDescription || '',
      status: destination?.status || 'draft',
      featured: destination?.featured || false,
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)

    try {
      let result

      if (mode === 'edit') {
        result = await updateDestinationAction(
          destination._id.toString(),
          data
        )
      } else {
        result =
          await createDestinationAction(data)
      }

      if (!result.success) {
        toast.error(result.message)
        return
      }

      toast.success(result.message)

      router.push('/dashboard/destinations')
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <FormInput
        label="Destination Name"
        placeholder="Serengeti National Park"
        {...register('name')}
        error={errors.name?.message}
      />

      <FormInput
        label="Slug"
        placeholder="serengeti-national-park"
        {...register('slug')}
        error={errors.slug?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Country"
          placeholder="Tanzania"
          {...register('country')}
          error={errors.country?.message}
        />

        <FormInput
          label="Region"
          placeholder="Northern Tanzania"
          {...register('region')}
          error={errors.region?.message}
        />
      </div>

      <FormTextarea
        label="Short Description"
        placeholder="A brief introduction..."
        {...register('shortDescription')}
        error={
          errors.shortDescription?.message
        }
      />

      <FormTextarea
        label="Description"
        placeholder="Describe the destination..."
        {...register('description')}
        error={errors.description?.message}
      />

      <div className="space-y-6">
        <ImageUpload
          label="Featured Image"
          onChange={(files) => {
            setFeaturedFile(files[0] || null)
          }}
        />

        <ImageUpload
          label="Destination Gallery"
          multiple
          maxFiles={10}
          onChange={setGalleryFiles}
        />
      </div>

      <FormInput
        label="SEO Title"
        placeholder="Serengeti Safari | Africa Safari"
        {...register('seoTitle')}
        error={errors.seoTitle?.message}
      />

      <FormTextarea
        label="SEO Description"
        placeholder="Explore the Serengeti..."
        {...register('seoDescription')}
        error={
          errors.seoDescription?.message
        }
      />

      <FormSelect
        label="Status"
        {...register('status')}
        error={errors.status?.message}
      >
        <option value="draft">
          Draft
        </option>

        <option value="published">
          Published
        </option>
      </FormSelect>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register('featured')}
          className="h-4 w-4"
        />

        <span className="text-sm">
          Featured Destination
        </span>
      </label>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            router.push(
              '/dashboard/destinations'
            )
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Saving...'
            : mode === 'edit'
              ? 'Update Destination'
              : 'Save Destination'}
        </Button>
      </div>
    </form>
  )
}