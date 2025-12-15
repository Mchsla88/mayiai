
import crypto from 'crypto';

interface SendMessageParams {
  recipientId: string;
  text: string;
  accessToken: string;
}

interface ReplyCommentParams {
  commentId: string;
  text: string;
  accessToken: string;
}

const GRAPH_API_URL = 'https://graph.facebook.com/v18.0';

export class InstagramClient {
  /**
   * Verify the X-Hub-Signature-256 header from Facebook Webhook
   */
  static verifySignature(body: string, signature: string, appSecret: string): boolean {
    if (!signature) return false;
    
    // Signature format is usually "sha256=<signature>"
    const [algo, sig] = signature.split('=');
    if (algo !== 'sha256') return false;

    const expectedSignature = crypto
      .createHmac('sha256', appSecret)
      .update(body)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(sig),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Send a private message (DM) to a user
   * Note: For Instagram, this usually requires the 'instagram_manage_messages' permission
   * and uses the 'messages' edge on the page or IG Business account.
   */
  static async sendPrivateMessage({ recipientId, text, accessToken }: SendMessageParams) {
    // For Instagram Graph API, sending a DM often uses the /me/messages endpoint
    // with 'recipient: { id: recipientId }'
    
    const url = `${GRAPH_API_URL}/me/messages?access_token=${accessToken}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Instagram API Error (Send DM): ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  /**
   * Reply to a specific comment
   * Uses POST /{comment-id}/replies
   */
  static async replyToComment({ commentId, text, accessToken }: ReplyCommentParams) {
    const url = `${GRAPH_API_URL}/${commentId}/replies?access_token=${accessToken}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Instagram API Error (Reply Comment): ${JSON.stringify(error)}`);
    }

    return response.json();
  }
  
  /**
   * Send a "Private Reply" to a comment (available for feed posts)
   * This sends a DM referencing the comment.
   * Endpoint: /{page-id}/messages with recipient: { comment_id: <id> }
   */
  static async sendPrivateReplyToComment({ commentId, text, accessToken }: ReplyCommentParams) {
      const url = `${GRAPH_API_URL}/me/messages?access_token=${accessToken}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: { comment_id: commentId },
          message: { text }
        })
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Instagram API Error (Private Reply): ${JSON.stringify(error)}`);
      }
  
      return response.json();
    }
}
