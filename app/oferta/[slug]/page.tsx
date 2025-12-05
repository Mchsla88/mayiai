import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { TrainingDetails } from './training-details'
import { trainingDetailsData } from '@/lib/training-details-data'

const imageMap: Record<string, string> = {
  'nauczyciele': '/training-nauczyciele.jpg',
  'dzieci': '/training-dzieci.jpg',
  'mlody-influencer': '/training-influencer.jpg',
  'bezpieczenstwo-w-sieci-i-ai': '/training-rodzice.jpg'
};

const titleMap: Record<string, string> = {
  'nauczyciele': 'Poradnik AI dla Nauczycieli: Wykorzystanie AI w Edukacji',
  'mlody-influencer': 'Młody Influencer: Budowanie Marki Osobistej'
};

const descriptionMap: Record<string, string> = {
  'mlody-influencer': 'Poradnik dla przyszłych twórców internetowych. Od pomysłu, przez montaż, aż po bezpieczne zarabianie i etykę w sieci.'
};

const priceMap: Record<string, number> = {
  'nauczyciele': 100,
  'dzieci': 100,
  'mlody-influencer': 100,
  'bezpieczenstwo-w-sieci-i-ai': 50
};

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
    ...details,
    imageUrl: imageMap[params.slug] || training.imageUrl,
    title: titleMap[params.slug] || training.title,
    shortDescription: descriptionMap[params.slug] || training.shortDescription,
    price: priceMap[params.slug] || training.price
  }

  return <TrainingDetails training={extendedTraining as any} />
}
