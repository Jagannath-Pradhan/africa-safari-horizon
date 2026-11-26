'use server'

import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { createSession, deleteSession } from '@/lib/session'

export async function loginAction(formData) {
  try {
    const email = String(formData.get('email') || '')
      .trim()
      .toLowerCase()

    const password = String(formData.get('password') || '')

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !password ||
      password.length > 128
    ) {
      return {
        success: false,
        message: 'Invalid email or password.',
      }
    }

    await connectDB()

    const admin = await Admin.findOne({ email })
      .select('+passwordHash')

    if (!admin || !admin.isActive) {
      return {
        success: false,
        message: 'Invalid email or password.',
      }
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.passwordHash
    )

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password.',
      }
    }

    await createSession(admin)

    return {
      success: true,
      message: 'Login successful.',
    }
  } catch (error) {
    console.error('Login error:', error)

    return {
      success: false,
      message: 'Unable to log in. Please try again.',
    }
  }
}

export async function logoutAction() {
  await deleteSession()

  return {
    success: true,
  }
}
