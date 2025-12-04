import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { TrainingDetails } from './training-details'
import { trainingDetailsData } from '@/lib/training-details-data'

export default async function TrainingPage({ params }: { params: { slug: string } }) {
  const training = await prisma.training.findUnique({
    where: { slug: params.slug }
  })

  if (!training) {
    notFound()
  }

  const details = trainingDetailsData[params.slug] || {}
  
  const extendedTraining = {
    ...training,
    ...details
  }

  return <TrainingDetails training={extendedTraining as any} />
}
