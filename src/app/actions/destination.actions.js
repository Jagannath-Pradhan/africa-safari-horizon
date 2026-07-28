'use server'

import { connectDB } from '@/lib/mongodb'
import Destination from '@/models/Destination'

export async function createDestination(data) {
  await connectDB()

  const destination = await Destination.create(data)

  return destination
}