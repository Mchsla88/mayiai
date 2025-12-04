import crypto from 'crypto';

export interface PayUConfig {
  posId: string;
  clientId: string;
  clientSecret: string;
  md5Key: string;
  environment: 'sandbox' | 'production';
}

export interface PayUOrderRequest {
  customerIp: string;
  merchantPosId: string;
  description: string;
  currencyCode: string;
  totalAmount: string;
  extOrderId?: string;
  buyer: {
    email: string;
    phone?: string;
    firstName: string;
    lastName: string;
    language?: string;
  };
  products: Array<{
    name: string;
    unitPrice: string;
    quantity: string;
  }>;
  continueUrl?: string;
  notifyUrl?: string;
}

export interface PayUOrderResponse {
  status: {
    statusCode: string;
  };
  redirectUri?: string;
  orderId?: string;
}

export class PayUClient {
  private config: PayUConfig;
  private baseUrl: string;

  constructor(config: PayUConfig) {
    this.config = config;
    this.baseUrl = config.environment === 'production'
      ? 'https://secure.payu.com'
      : 'https://secure.snd.payu.com';
  }

  /**
   * Get OAuth access token
   */
  private async getAccessToken(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/pl/standard/user/oauth/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PayU OAuth Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: `${this.baseUrl}/pl/standard/user/oauth/authorize`,
        clientId: this.config.clientId,
        environment: this.config.environment,
      });
      throw new Error(`PayU OAuth failed: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data.access_token;
  }

  /**
   * Create a new order
   */
  /**
   * Create a new order
   */
  async createOrder(orderData: PayUOrderRequest): Promise<PayUOrderResponse> {
    const token = await this.getAccessToken();

    const response = await fetch(`${this.baseUrl}/api/v2_1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...orderData,
        merchantPosId: this.config.posId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PayU Create Order Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: `${this.baseUrl}/api/v2_1/orders`,
      });
      throw new Error(`PayU order creation failed: ${response.statusText} - ${errorText}`);
    }

    try {
      const data = await response.json();
      return data;
    } catch (e) {
       const text = await response.text();
       console.error('PayU JSON Parse Error:', text);
       throw new Error('Failed to parse PayU response');
    }
  }

  /**
   * Verify notification signature
   */
  verifyNotification(body: string, signature: string): boolean {
    const hash = crypto
      .createHash('md5')
      .update(body + this.config.md5Key)
      .digest('hex');

    return hash === signature;
  }

  /**
   * Get order details
   */
  async getOrder(orderId: string): Promise<any> {
    const token = await this.getAccessToken();

    const response = await fetch(`${this.baseUrl}/api/v2_1/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`PayU get order failed: ${response.statusText}`);
    }

    return response.json();
  }
}

/**
 * Get PayU client instance
 */
export function getPayUClient(): PayUClient {
  const config: PayUConfig = {
    posId: process.env.PAYU_POS_ID!,
    clientId: process.env.PAYU_CLIENT_ID!,
    clientSecret: process.env.PAYU_CLIENT_SECRET!,
    md5Key: process.env.PAYU_MD5_KEY!,
    environment: (process.env.PAYU_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
  };

  if (!config.posId || !config.clientId || !config.clientSecret || !config.md5Key) {
    throw new Error('PayU configuration is incomplete. Check environment variables.');
  }

  return new PayUClient(config);
}
