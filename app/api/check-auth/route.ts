
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const cookieStore = cookies()
    const cookieNames = cookieStore.getAll().map(c => c.name)

    return NextResponse.json({ 
      authenticated: !!session, 
      user: session?.user,
      timestamp: new Date().toISOString(),
      cookies: cookieNames
    })
  } catch (error) {
    return NextResponse.json({ 
      authenticated: false, 
      error: String(error) 
    }, { status: 500 })
  }
}
