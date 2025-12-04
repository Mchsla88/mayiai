
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { TrainingDetails } from './training-details'

export default async function TrainingPage({ params }: { params: { slug: string } }) {
  const training = await prisma.training.findUnique({
    where: { slug: params.slug }
  })

  if (!training) {
    notFound()
  }

  return <TrainingDetails training={training as any} />
}
