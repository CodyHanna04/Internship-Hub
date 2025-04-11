import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ status: 'success' })
  res.cookies.set('__session', '', { maxAge: 0 })
  return res
}
