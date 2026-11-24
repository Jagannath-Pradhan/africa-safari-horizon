import 'server-only'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 60 * 60 * 24 * 7 // 7 days

function getSecretKey() {
  const secret = process.env.JWT_SECRET

  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must contain at least 32 characters.')
  }

  return new TextEncoder().encode(secret)
}

export async function createSession(admin) {
  const token = await new SignJWT({
    role: admin.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(admin._id.toString())
    .setIssuedAt()
    .setExpirationTime('7d')
    .setIssuer('africa-safari-admin')
    .setAudience('africa-safari-dashboard')
    .sign(getSecretKey())

  const cookieStore = await cookies()

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION,
  })
}

export async function verifySession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      issuer: 'africa-safari-admin',
      audience: 'africa-safari-dashboard',
    })

    if (!payload.sub) return null

    return {
      id: payload.sub,
      role: payload.role,
    }
  } catch {
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}