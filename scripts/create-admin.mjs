import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../src/models/Admin.js'

const {
  MONGODB_URI,
  ADMIN_NAME,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = process.env

async function createAdmin() {
  try {
    if (!MONGODB_URI || !ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error('Missing required environment variables.')
    }

    if (ADMIN_PASSWORD.length < 12) {
      throw new Error('Admin password must be at least 12 characters.')
    }

    await mongoose.connect(MONGODB_URI)

    const email = ADMIN_EMAIL.trim().toLowerCase()

    const existingAdmin = await Admin.findOne({ email })

    if (existingAdmin) {
      console.log('An admin with this email already exists.')
      return
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12)

    await Admin.create({
      name: ADMIN_NAME,
      email,
      passwordHash,
      role: 'admin',
      isActive: true,
    })

    console.log('Admin account created successfully.')
  } catch (error) {
    console.error('Admin creation failed:', error.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

createAdmin()
