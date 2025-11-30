import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function DzieciTrainingPage() {
  const session = await getServerSession(authOptions)
  
  // Redirect if not logged in
  if (!session) {
    redirect('/auth/login?callbackUrl=/szkolenia/dzieci')
  }

  // Redirect to actual training page
  redirect('/szkolenia/dzieci/content')
}
