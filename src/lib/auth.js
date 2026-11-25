import 'server-only'

import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { verifySession } from '@/lib/session'

export async function getCurrentAdmin() {
  const session = await verifySession()

  if (!session) return null

  await connectDB()

  const admin = await Admin.findById(session.id)
    .select('_id name email role isActive')
    .lean()

  if (!admin || !admin.isActive) {
    return null
  }

  return {
    id: admin._id.toString(),
    name: admin.name,
    email: admin.email,
    role: admin.role,
  }
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect('/login')
  }

  return admin
}