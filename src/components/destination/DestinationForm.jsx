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



'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { destinationSchema } from '@/validations/destination.schema'

import FormInput from '@/components/forms/FormInput'
import FormTextarea from '@/components/forms/FormTextarea'
import FormSelect from '@/components/forms/FormSelect'

export default function DestinationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(destinationSchema),

    defaultValues: {
      status: 'draft',
      featured: false,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <FormInput
        label="Destination Name"
        {...register('name')}
        error={errors.name?.message}
      />

      <FormInput
        label="Slug"
        {...register('slug')}
        error={errors.slug?.message}
      />

      <FormInput
        label="Country"
        {...register('country')}
        error={errors.country?.message}
      />

      <FormInput
        label="Region"
        {...register('region')}
        error={errors.region?.message}
      />

      <FormTextarea
        label="Short Description"
        {...register('shortDescription')}
        error={
          errors.shortDescription?.message
        }
      />

      <FormTextarea
        label="Description"
        {...register('description')}
        error={
          errors.description?.message
        }
      />

      <FormInput
        label="SEO Title"
        {...register('seoTitle')}
      />

      <FormTextarea
        label="SEO Description"
        {...register('seoDescription')}
      />

      <FormSelect
        label="Status"
        {...register('status')}
      >
        <option value="draft">
          Draft
        </option>

        <option value="published">
          Published
        </option>
      </FormSelect>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('featured')}
        />

        <label>
          Featured Destination
        </label>
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