
import { prisma } from '@/lib/prisma';
import { InstagramClient } from './client';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface WebhookEvent {
  object: 'instagram';
  entry: Array<{
    id: string; // Page ID
    time: number;
    messaging?: Array<any>;
    changes?: Array<{
      field: string;
      value: {
        id: string; // Comment ID or Object ID
        from?: {
          id: string;
          username: string;
        };
        text?: string;
        media?: {
          id: string;
          media_product_type?: string;
        };
        parent_id?: string; // If reply
      };
    }>;
  }>;
}

export class InstagramProcessor {
  static async processEvent(event: WebhookEvent) {
    console.log('[InstagramProcessor] Processing event:', JSON.stringify(event, null, 2));

    for (const entry of event.entry) {
      const pageId = entry.id;

      // 1. Get Config for this Page
      const config = await prisma.instagramConfig.findUnique({
        where: { pageId },
      });

      if (!config || !config.isActive) {
        console.log(`[InstagramProcessor] No active config found for page ${pageId}`);
        continue;
      }

      // Handle "changes" (Comments usually come here for 'comments' field)
      if (entry.changes) {
        for (const change of entry.changes) {
          if (change.field === 'comments') {
            await this.handleComment(change.value, config);
          }
        }
      }
      
      // Handle "messaging" (DMs) - not implemented yet for matching logic, 
      // but plan was mostly about Comments -> DM.
    }
  }

  private static async handleComment(comment: any, config: any) {
    const { id: commentId, text, from, media } = comment;
    
    // Ignore self-comments (if possible to detect, but webhook usually sends all)
    // We can assume we don't want to reply to ourselves if we could identify our ID.
    // For now, let's process everything.

    if (!text || !from) return;

    console.log(`[InstagramProcessor] Handling comment from ${from.username}: "${text}"`);

    // 2. Find matching rules
    // Simple verification: if text contains keyword (case-insensitive)
    const rule = await prisma.automationRule.findFirst({
        where: {
            isActive: true,
            // We'll filter in code for "contains" logic effectively or exact match
            // Prisma "contains" is simple substring.
        }
    });

    // Fetch all active rules and find the best match in memory (for regex or keyword inclusion)
    // This is safer than limited Prisma filtering for now.
    const allRules = await prisma.automationRule.findMany({ where: { isActive: true } });
    
    // Find rule where keyword is in text
    const matchedRule = allRules.find(r => 
        text.toLowerCase().includes(r.keyword.toLowerCase())
    );

    if (matchedRule) {
        console.log(`[InstagramProcessor] Matched rule: ${matchedRule.keyword}`);
        
        let logStatus = 'SUCCESS';
        let errorMsg = null;
        let responseContent = '';

        try {
             // ACTION: Send DM
             if (matchedRule.actionType.includes('DM') && matchedRule.dmContent) {
                console.log(`[InstagramProcessor] Sending DM...`);
                await InstagramClient.sendPrivateReplyToComment({
                    commentId,
                    text: matchedRule.dmContent,
                    accessToken: config.accessToken
                });
                
                // If there is also a discount code, maybe append it? 
                // The plan says "DM Content: Text of the message / Discount Code".
                // We assume dmContent holds the full message.
                
                await this.logAction({
                    commentId,
                    username: from.username,
                    userMessage: text,
                    actionTaken: 'SENT_DM',
                    responseContent: matchedRule.dmContent,
                    status: 'SUCCESS'
                });
             }

             // ACTION: Reply to Comment
             if (matchedRule.actionType.includes('REPLY')) {
                let replyText = matchedRule.replyContent || '';

                // Generate with AI if enabled
                if (matchedRule.useAi) {
                    const aiReply = await this.generateAiReply(text, config, matchedRule.replyContent);
                    if (aiReply) replyText = aiReply;
                }

                if (replyText) {
                    console.log(`[InstagramProcessor] Replying to comment...`);
                    await InstagramClient.replyToComment({
                        commentId,
                        text: replyText,
                        accessToken: config.accessToken
                    });

                    await this.logAction({
                        commentId,
                        username: from.username,
                        userMessage: text,
                        actionTaken: 'REPLIED_COMMENT',
                        responseContent: replyText,
                        status: 'SUCCESS'
                    });
                }
             }

        } catch (error: any) {
            console.error('[InstagramProcessor] Error executing actions:', error);
            logStatus = 'FAILED';
            errorMsg = error.message;

            await this.logAction({
                commentId,
                username: from.username,
                userMessage: text,
                actionTaken: 'ERROR',
                status: 'FAILED',
                error: errorMsg
            });
        }
    }
  }

  private static async generateAiReply(userMessage: string, config: any, instructions?: string | null): Promise<string | null> {
      const systemPrompt = instructions || config.systemPrompt || 'You are a helpful assistant on Instagram.';
      
      console.log(`[InstagramProcessor] Generating AI reply using ${config.activeAiProvider}`);

      try {
          if (config.activeAiProvider === 'GEMINI') {
              if (!config.geminiApiKey) throw new Error('Gemini API Key missing');
              
              const genAI = new GoogleGenerativeAI(config.geminiApiKey);
              const model = genAI.getGenerativeModel({ model: "gemini-pro"});
              
              const prompt = `${systemPrompt}\n\nUser Comment: "${userMessage}"\n\nReply (short, friendly, instagram style):`;
              const result = await model.generateContent(prompt);
              const response = await result.response;
              return response.text();

          } else {
              // Default to OpenAI
              if (!config.openaiApiKey) throw new Error('OpenAI API Key missing');
              
              const openai = new OpenAI({ apiKey: config.openaiApiKey });
              const completion = await openai.chat.completions.create({
                  messages: [
                      { role: 'system', content: systemPrompt },
                      { role: 'user', content: `Reply to this Instagram comment: "${userMessage}"` }
                  ],
                  model: 'gpt-3.5-turbo',
                  max_tokens: 150,
              });
              
              return completion.choices[0].message.content;
          }
      } catch (error) {
          console.error('[InstagramProcessor] AI Generation failed:', error);
          return null; // Fallback to nothing or static?
      }
  }

  private static async logAction(data: any) {
      await prisma.instagramLog.create({ data });
  }
}
