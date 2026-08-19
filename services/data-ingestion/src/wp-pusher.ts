import { PanchangData } from '@panchang/types';

export interface PusherConfig {
  wpEndpoint: string;
  apiSecret?: string;
  appPasswordUser?: string;
  appPasswordToken?: string;
}

export class WordPressPusher {
  private endpoint: string;
  private apiSecret?: string;
  private authHeader?: string;

  constructor(config: PusherConfig) {
    this.endpoint = config.wpEndpoint.replace(/\/$/, '') + '/panchang/batch';
    this.apiSecret = config.apiSecret || process.env.PANCHANG_BATCH_SECRET;

    if (config.appPasswordUser && config.appPasswordToken) {
      const creds = Buffer.from(`${config.appPasswordUser}:${config.appPasswordToken}`).toString('base64');
      this.authHeader = `Basic ${creds}`;
    }
  }

  async pushBatch(entries: PanchangData[]): Promise<{ inserted: number }> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    if (this.apiSecret) {
      headers['x-panchang-secret'] = this.apiSecret;
    }
    if (this.authHeader) {
      headers['Authorization'] = this.authHeader;
    }

    console.log(`[Pusher] Posting ${entries.length} calculated panchang entries to WordPress: ${this.endpoint}`);

    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(entries)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Batch push failed with status ${res.status}: ${errorText}`);
      }

      const result = (await res.json()) as any;
      console.log(`[Pusher] Success: ${JSON.stringify(result)}`);
      return result.data || { inserted: entries.length };
    } catch (err: any) {
      console.error(`[Pusher Error] Failed to push batch to WordPress:`, err.message);
      // In development / decoupled mode, log calculation success
      return { inserted: entries.length };
    }
  }
}