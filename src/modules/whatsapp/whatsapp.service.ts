import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { MessageDto } from './dto/whatsapp.dto';
import { CreateMessageTemplateDto } from './dto/create-message-template.dto';
import { SendUtilityMessageDto } from './dto/send-utility-message.dto';
import { PrismaService } from 'prisma/prisma.service';
import { TokenDto } from './dto/token.dto';
import * as crypto from "crypto";


interface GenerateOptions {
  scopes?: string;
  expiring?: boolean;
}

export interface WhatsappMediaFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}


@Injectable()
export class WhatsappService {
  private readonly baseUrl: string;
   private readonly graph: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {
    const phoneNumberId = this.configService.get<string>('WHATSAPP_PHONE_NUMBER_ID');
    const version = this.configService.get<string>('WHATSAPP_VERSION');
    console.log(version, phoneNumberId, 'version and phone number id');
    
    this.baseUrl = `https://graph.facebook.com/${version}/1306783259184340`;
     this.graph = `https://graph.facebook.com/${version}`;
    console.log(this.baseUrl, 'base_url');
  }

  private appSecretProof(token: string, secret: string): string {
    return crypto.createHmac("sha256", secret).update(token).digest("hex");
  }

  private async graphPost(
    path: string,
    params: Record<string, string>,
  ): Promise<any> {
    const res = await fetch(`${this.graph}${path}`, {
      method: "POST",
      body: new URLSearchParams(params),
    });
    const json = await res.json();
    if (!res.ok || json.error) {
      console.log(`Graph error on ${path}: ${JSON.stringify(json.error)}`);
      // this.logger.error(`Graph error on ${path}: ${JSON.stringify(json.error)}`);
      throw new InternalServerErrorException(
        json.error?.message || "Graph API request failed",
      );
    }
    return json;
  }

  /** Idempotent: installs the app for the system user. */
  private async installApp(systemUserId: string, appId: string, adminToken: string) {
    return this.graphPost(`/${systemUserId}/applications`, {
      business_app: appId,
      access_token: adminToken,
    });
  }

  /** Installs the app (if needed) and generates a system user access token. */
  async generateSystemToken(opts: GenerateOptions = {}): Promise<{ access_token: string }> {
    const systemUserId = process.env.FB_SYSTEM_USER_ID as string;
    // this.config.getOrThrow<string>("FB_SYSTEM_USER_ID");
    const appId = process.env.FB_APP_ID as string;
    // this.config.getOrThrow<string>("FB_APP_ID");
    const appSecret = process.env.FB_APP_SECRET as string;
    // this.config.getOrThrow<string>("FB_APP_SECRET");
    // const adminToken = process.env.FB_ADMIN_TOKEN as string;
    const scopes =
      opts.scopes || process.env.FB_DEFAULT_SCOPES as string;
      // this.config.get<string>("FB_DEFAULT_SCOPES", "ads_management");

      // get token
      let get_access_token = this.prisma.token.findFirst({
        orderBy: { createdAt: 'desc' },
      });
      const adminToken = (await get_access_token)?.facebookLongLivedAccessToken;
      if (!adminToken) {
        throw new Error('No admin token found in the database. Please store a valid token first.');
      }

    await this.installApp(systemUserId, appId, adminToken);

    const params: Record<string, string> = {
      business_app: appId,
      scope: scopes,
      appsecret_proof: this.appSecretProof(adminToken, appSecret),
      access_token: adminToken,
    };
    if (opts.expiring) params.set_token_expires_in_60_days = "true";

    const { access_token } = await this.graphPost(
      `/${systemUserId}/access_tokens`,
      params,
    );
    return { access_token };
  }


  // https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-customers-as-a-tech-provider
  //  Exchange the token code for a business token
  async getAccessToken(): Promise<string> {
    const endpoint = 'https://graph.facebook.com/oauth/access_token';
    const appId = this.configService.get<string>('WHATSAPP_APP_ID');
    const appSecret = this.configService.get<string>('WHATSAPP_APP_SECRET');

    if (!appId || !appSecret) {
      throw new Error(
        'WHATSAPP_APP_ID and WHATSAPP_APP_SECRET are required',
      );
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(endpoint, {
          params: {
            client_id: appId,
            client_secret: appSecret,
            grant_type: 'client_credentials',
          },
        }),
      );
      console.log(response.data, 'response data');

      const accessToken = response.data?.access_token;
      if (!accessToken) {
        throw new Error('Facebook Graph API response did not include access_token');
      }

      return accessToken;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async getLongLivedToken(accessToken: string): Promise<string> {
    const version = this.configService.get<string>('WHATSAPP_VERSION');
    const appId = this.configService.get<string>('WHATSAPP_APP_ID');
    const appSecret = this.configService.get<string>('WHATSAPP_APP_SECRET');
    console.log(accessToken, version, appId, appSecret, 'app_details');

    if (!accessToken || !version || !appId || !appSecret) {
      throw new Error(
        'accessToken, WHATSAPP_VERSION, WHATSAPP_APP_ID, and WHATSAPP_APP_SECRET are required',
      );
    }

    const endpoint = `https://graph.facebook.com/${version}/oauth/access_token`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(endpoint, {
          params: {
            grant_type: 'fb_exchange_token',
            client_id: appId,
            client_secret: appSecret,
            fb_exchange_token: accessToken,
          },
        }),
      );

      const longLivedToken = response.data?.access_token;
      if (!longLivedToken) {
        throw new Error(
          'Facebook Graph API response did not include access_token',
        );
      }

      // call store-token

      await this.saveToken({facebookAccessToken: accessToken, facebookLongLivedAccessToken: longLivedToken })


      return longLivedToken;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async debugToken(): Promise<any> {
    const fetch_access_token = await this.prisma.token.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    const accessToken = fetch_access_token?.facebookLongLivedAccessToken;

    if (!accessToken) {
      throw new Error(
        'No Facebook access token found in the database. Please store a valid token first.',
      );
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get('https://graph.facebook.com/debug_token', {
          params: {
            input_token: accessToken,
            access_token: accessToken,
          },
        }),
      );

      console.log(response, 'debug token response');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async getMessagingLimit(): Promise<any> {
    const systemUserId =
      process.env.FB_SYSTEM_USER_ID || process.env.WHATSAPP_APP_ID;
    const fetch_access_token = await this.prisma.token.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    const accessToken = fetch_access_token?.facebookLongLivedAccessToken;

    if (!systemUserId) {
      throw new Error(
        'FB_SYSTEM_USER_ID or WHATSAPP_APP_ID is required',
      );
    }
    if (!accessToken) {
      throw new Error(
        'A stored Facebook long-lived access token is required',
      );
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.graph}/${systemUserId}`, {
          params: {
            fields: 'whatsapp_business_manager_messaging_limit',
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async createMessageTemplate(dto: CreateMessageTemplateDto): Promise<any> {
    const version = this.configService.get<string>('WHATSAPP_VERSION');
    const businessAccountId = this.configService.get<string>(
      'WABA_ID',
    );

    if (!version || !businessAccountId) {
      throw new Error(
        'WHATSAPP_VERSION and WABA_ID are required',
      );
    }

                      let fetch_access_token = await this.prisma.token.findFirst({
        orderBy: { createdAt: 'desc' },
      });

    const endpoint = `https://graph.facebook.com/v23.0/${businessAccountId}/message_templates`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(endpoint, dto, {
          headers: {
            Authorization: `Bearer ${fetch_access_token?.facebookLongLivedAccessToken}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async getMessageTemplates(): Promise<any> {
    const version = this.configService.get<string>('WHATSAPP_VERSION');
    const businessAccountId = this.configService.get<string>('WABA_ID');
    // const accessToken = this.configService.get<string>(
    //   'WHATSAPP_LONG_LIVED_ACCESS_TOKEN',
    // );

      let fetch_access_token = await this.prisma.token.findFirst({
        orderBy: { createdAt: 'desc' },
      });

    if (!version || !businessAccountId || !fetch_access_token?.facebookLongLivedAccessToken) {
      throw new Error(
        'WHATSAPP_VERSION, WABA_ID, and WHATSAPP_LONG_LIVED_ACCESS_TOKEN are required',
      );
    }

    const endpoint = `https://graph.facebook.com/${version}/${businessAccountId}/message_templates`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(endpoint, {
          headers: {
            Authorization: `Bearer ${fetch_access_token?.facebookLongLivedAccessToken}`,
            // ${fetch_access_token?.facebookAccessToken}`,
          },
        }),
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async getMessageTemplateStatus(templateId: string): Promise<any> {
    const version = this.configService.get<string>('WHATSAPP_VERSION');
    // const accessToken = this.configService.get<string>(
    //   'WHATSAPP_LONG_LIVED_ACCESS_TOKEN',
    // );
              let fetch_access_token = await this.prisma.token.findFirst({
        orderBy: { createdAt: 'desc' },
      });

    if (!templateId || !version || !fetch_access_token?.facebookLongLivedAccessToken) {
      throw new Error(
        'templateId, WHATSAPP_VERSION, and WHATSAPP_LONG_LIVED_ACCESS_TOKEN are required',
      );
    }

    const endpoint = `https://graph.facebook.com/${version}/${templateId}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(endpoint, {
          params: { fields: 'status' },
          headers: {
            Authorization: `Bearer ${fetch_access_token?.facebookLongLivedAccessToken}`,
          },
        }),
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async sendMessage(dto: MessageDto): Promise<any> {

          let fetch_access_token = await this.prisma.token.findFirst({
        orderBy: { createdAt: 'desc' },
      });
    const url = `${this.baseUrl}/messages`;
    
    const body = {
      messaging_product: 'whatsapp',
      to: dto.to,
      type: 'text',
      text: { body: dto.text },
    };

    const headers = {
      Authorization: `Bearer ${fetch_access_token?.facebookLongLivedAccessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      return response.data;
    } catch (error: any) {
        console.log(error, 'log error')
      throw error.response?.data || error.message;
    }
  }

  async uploadMedia(
    phoneNumberId: string,
    file: WhatsappMediaFile,
  ): Promise<any> {
    const version = this.configService.get<string>('WHATSAPP_VERSION');
    const tokenRecord = await this.prisma.token.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    const accessToken = tokenRecord?.facebookLongLivedAccessToken;

    if (!phoneNumberId || !version) {
      throw new Error('phoneNumberId and WHATSAPP_VERSION are required');
    }
    if (!file?.buffer || !file.mimetype || !file.originalname) {
      throw new Error('An image file is required');
    }
    if (!file.mimetype.startsWith('image/')) {
      throw new Error('Only image files can be uploaded');
    }
    if (!accessToken) {
      throw new Error(
        'No Facebook access token found in the database. Please store a valid token first.',
      );
    }

    const fileBytes = new ArrayBuffer(file.buffer.byteLength);
    new Uint8Array(fileBytes).set(file.buffer);

    const formData = new FormData();
    formData.append('messaging_product', 'whatsapp');
    formData.append('type', file.mimetype);
    formData.append(
      'file',
      new Blob([fileBytes], { type: file.mimetype }),
      file.originalname,
    );

    try {
      const response = await fetch(
        `https://graph.facebook.com/${version}/${phoneNumberId}/media`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        },
      );
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new InternalServerErrorException(
          data.error?.message || 'WhatsApp media upload failed',
        );
      }

      return data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async sendUtilityMessage(dto: SendUtilityMessageDto): Promise<any> {
    const version = this.configService.get<string>('WHATSAPP_VERSION');
    const phoneNumberId =
      this.configService.get<string>('WHATSAPP_BUSINESS_PHONE_NUMBER_ID') ||
      '1343947352130201';

      let fetch_access_token = await this.prisma.token.findFirst({
        orderBy: { createdAt: 'desc' },
      });
      console.log(fetch_access_token, 'fetch access token');

    if(!fetch_access_token) {
      throw new Error('No access token found in the database. Please store a valid token first.');
    }

    if (!version || !phoneNumberId) {
      throw new Error(
        'WHATSAPP_VERSION and WHATSAPP_BUSINESS_PHONE_NUMBER_ID are required',
      );
    }

    const endpoint = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
    const body = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: dto.to,
      type: 'template',
      template: {
        name: dto.templateName,
        language: {
          code: dto.templateLanguage,
        },
        ...(dto.components?.length ? { components: dto.components } : {}),
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(endpoint, body, {
          headers: {
            Authorization: `Bearer ${fetch_access_token.facebookLongLivedAccessToken}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      return response.data;
    } catch (error: any) {
      console.log(error, 'log error')
      throw error.response?.data || error.message;
    }
  }

  async saveToken(dto: TokenDto): Promise<void> {
    try {
      await this.prisma.token.create({
        data: {
          facebookAccessToken: dto.facebookAccessToken,
          facebookLongLivedAccessToken: dto.facebookLongLivedAccessToken,
        },
      });


    } catch(error) {
      console.error('Error saving token to database:', error);
      throw new Error('Failed to save token to database');
    }
  }

  async editTokenById(id: string, dto: TokenDto): Promise<void> {
    try {
      await this.prisma.token.update({
        where: { id },
        data: {
          facebookAccessToken: dto.facebookAccessToken,
          facebookLongLivedAccessToken: dto.facebookLongLivedAccessToken,
        },
      });
    } catch (error) {
      console.error('Error updating token in database:', error);
      throw new Error('Failed to update token in database');
    }
  }

  async getTokens(): Promise<any> {
    try {
      const tokenRecord = await this.prisma.token.findFirst({
        orderBy: { createdAt: 'desc' },
      });

      if (!tokenRecord) {
        return null;
      }

      return {
        tokenRecord
      };
    } catch (error) {
      console.error('Error retrieving tokens from database:', error);
      throw new Error('Failed to retrieve tokens from database');
    }
  }
}
