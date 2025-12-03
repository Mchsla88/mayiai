import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { sendWelcomeEmailAdmin } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin && session?.user?.email !== 'michal@mayiai.pl') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isAdmin: true,
        createdAt: true,
        userTrainings: {
          select: {
            training: {
              select: {
                title: true
              }
            },
            createdAt: true // Include when access was granted
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedUsers = users.map(user => ({
      ...user,
      trainings: user.userTrainings.map(ut => ({
        title: ut.training.title,
        grantedAt: ut.createdAt
      }))
    }))

    return NextResponse.json(formattedUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin && session?.user?.email !== 'michal@mayiai.pl') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, email, password } = body

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Użytkownik z tym adresem email już istnieje' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        role: 'USER',
        isAdmin: false
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isAdmin: true,
        createdAt: true
      }
    })

    // Send welcome email with credentials
    try {
      await sendWelcomeEmailAdmin(email.toLowerCase(), password, `${firstName} ${lastName}`)
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { 
        message: 'Użytkownik utworzony pomyślnie. Email z danymi logowania został wysłany.',
        user
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas tworzenia użytkownika' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin && session?.user?.email !== 'michal@mayiai.pl') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Prevent deleting self
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: 'Nie możesz usunąć własnego konta' },
        { status: 400 }
      )
    }

    // 1. Anonymize or detach orders (since we can't delete financial records easily without schema change)
    // We set userId to null for orders belonging to this user
    await prisma.order.updateMany({
      where: { userId: userId },
      data: { userId: null }
    })
    
    // 2. Delete the user (Cascade will handle other relations like UserTraining, Account, etc.)
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json(
      { message: 'Użytkownik został usunięty' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas usuwania użytkownika' },
      { status: 500 }
    )
  }
}
