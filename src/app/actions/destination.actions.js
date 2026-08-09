// 'use server'

// import { connectDB } from '@/lib/mongodb'
// import Destination from '@/models/Destination'

// export async function createDestination(data) {
//   await connectDB()

//   const destination = await Destination.create(data)

//   return destination
// }


// 'use server'

// import { revalidatePath } from 'next/cache'

// import { connectDB } from '@/lib/mongodb'
// import { createDestination } from '@/services/destination.service'

// export async function createDestinationAction(data) {
//   await connectDB()

//   await createDestination(data)

//   revalidatePath('/dashboard/destinations')
// }


'use server'

import { revalidatePath } from 'next/cache'
import { connectDB } from '@/lib/mongodb'

import {
  createDestination,
  updateDestination,
  deleteDestination,
} from '@/services/destination.service'

export async function createDestinationAction(data) {
  try {
    await connectDB()

    await createDestination(data)

    revalidatePath('/dashboard/destinations')

    return {
      success: true,
      message: 'Destination created successfully.',
    }
  } catch (error) {
    console.error(
      'Create destination error:',
      error
    )

    return {
      success: false,
      message: 'Failed to create destination.',
    }
  }
}

export async function updateDestinationAction(
  id,
  data
) {
  try {
    await connectDB()

    const destination =
      await updateDestination(id, data)

    if (!destination) {
      return {
        success: false,
        message: 'Destination not found.',
      }
    }

    revalidatePath('/dashboard/destinations')
    revalidatePath(
      `/dashboard/destinations/${id}/edit`
    )

    return {
      success: true,
      message: 'Destination updated successfully.',
    }
  } catch (error) {
    console.error(
      'Update destination error:',
      error
    )

    return {
      success: false,
      message: 'Failed to update destination.',
    }
  }
}

export async function deleteDestinationAction(id) {
  try {
    await connectDB()

    const destination =
      await deleteDestination(id)

    if (!destination) {
      return {
        success: false,
        message: 'Destination not found.',
      }
    }

    revalidatePath('/dashboard/destinations')

    return {
      success: true,
      message: 'Destination deleted successfully.',
    }
  } catch (error) {
    console.error(
      'Delete destination error:',
      error
    )

    return {
      success: false,
      message: 'Failed to delete destination.',
    }
  }
}