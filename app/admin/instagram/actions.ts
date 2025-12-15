
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function saveInstagramConfig(data: any) {
  const { pageId, accessToken, verifyToken, openaiApiKey, geminiApiKey, activeAiProvider, systemPrompt } = data
  
  await prisma.instagramConfig.upsert({
    where: { pageId },
    update: {
      accessToken,
      verifyToken,
      openaiApiKey,
      geminiApiKey,
      activeAiProvider,
      systemPrompt,
      updatedAt: new Date()
    },
    create: {
      pageId,
      accessToken,
      verifyToken,
      openaiApiKey,
      geminiApiKey,
      activeAiProvider,
      systemPrompt
    }
  })
  
  revalidatePath('/admin/instagram')
  return { success: true }
}

export async function getInstagramConfig() {
  return await prisma.instagramConfig.findFirst()
}

export async function createAutomationRule(data: any) {
  await prisma.automationRule.create({
    data: {
      keyword: data.keyword.toLowerCase(),
      actionType: data.actionType,
      dmContent: data.dmContent,
      replyContent: data.replyContent,
      useAi: data.useAi,
      isActive: true
    }
  })
  revalidatePath('/admin/instagram')
  revalidatePath('/admin/instagram/rules')
  return { success: true }
}

export async function deleteAutomationRule(id: string) {
  await prisma.automationRule.delete({ where: { id } })
  revalidatePath('/admin/instagram/rules')
  return { success: true }
}

export async function getAutomationRules() {
  return await prisma.automationRule.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getInstagramLogs() {
  return await prisma.instagramLog.findMany({
    take: 50,
    orderBy: { createdAt: 'desc' }
  })
}
