import { z } from 'zod'

export const destinationSchema = z.object({
  name: z
    .string()
    .min(3, 'Destination name is required'),

  slug: z
    .string()
    .min(3, 'Slug is required'),

  country: z
    .string()
    .min(2, 'Country is required'),

  region: z
    .string()
    .optional(),

  shortDescription: z
    .string()
    .min(10, 'Short description is required'),

  description: z
    .string()
    .min(20, 'Description is required'),

  seoTitle: z.string().optional(),

  seoDescription: z.string().optional(),

  status: z.enum([
    'draft',
    'published',
  ]),

  featured: z.boolean(),
})