// app/api/session/route.ts
import { auth } from '../../../../lib/firebaseAdmin'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { idToken } = await req.json()

  const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })

    const response = NextResponse.json({ status: 'success' })
    response.cookies.set('__session', sessionCookie, {
      httpOnly: true,
      secure: false, // ✅ for local dev
      path: '/',
      maxAge: expiresIn / 1000,
    })

    return response
  } catch (error) {
    console.error('Failed to create session:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
