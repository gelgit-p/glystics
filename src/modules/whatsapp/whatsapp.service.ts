import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { MessageDto } from './dto/whatsapp.dto';
import { CreateMessageTemplateDto } from './dto/create-message-template.dto';
import { SendUtilityMessageDto } from './dto/send-utility-message.dto';

@Injectable()
export class WhatsappService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const phoneNumberId = this.configService.get<string>('WHATSAPP_PHONE_NUMBER_ID');
    const version = this.configService.get<string>('WHATSAPP_VERSION');
    console.log(version, phoneNumberId, 'version and phone number id');
    
    this.baseUrl = `https://graph.facebook.com/${version}/1306783259184340`;
    console.log(this.baseUrl, 'base_url');
  }

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

      return longLivedToken;
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

    const endpoint = `https://graph.facebook.com/v23.0/${businessAccountId}/message_templates`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(endpoint, dto, {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_LONG_LIVED_ACCESS_TOKEN}`,
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
    const accessToken = this.configService.get<string>(
      'WHATSAPP_LONG_LIVED_ACCESS_TOKEN',
    );

    if (!version || !businessAccountId || !accessToken) {
      throw new Error(
        'WHATSAPP_VERSION, WABA_ID, and WHATSAPP_LONG_LIVED_ACCESS_TOKEN are required',
      );
    }

    const endpoint = `https://graph.facebook.com/${version}/${businessAccountId}/message_templates`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(endpoint, {
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

  async getMessageTemplateStatus(templateId: string): Promise<any> {
    const version = this.configService.get<string>('WHATSAPP_VERSION');
    const accessToken = this.configService.get<string>(
      'WHATSAPP_LONG_LIVED_ACCESS_TOKEN',
    );
    if (!templateId || !version || !accessToken) {
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
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async sendMessage(dto: MessageDto): Promise<any> {
              const accessToken = this.configService.get<string>(
      'WHATSAPP_LONG_LIVED_ACCESS_TOKEN',
    );
    const url = `${this.baseUrl}/messages`;
    
    const body = {
      messaging_product: 'whatsapp',
      to: dto.to,
      type: 'text',
      text: { body: dto.text },
    };

    const headers = {
      Authorization: `Bearer ${accessToken}`,
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

  async sendUtilityMessage(dto: SendUtilityMessageDto): Promise<any> {
    const version = this.configService.get<string>('WHATSAPP_VERSION');
    const phoneNumberId =
      this.configService.get<string>('WHATSAPP_BUSINESS_PHONE_NUMBER_ID') ||
      '1343947352130201';
          const accessToken = this.configService.get<string>(
      'WHATSAPP_LONG_LIVED_ACCESS_TOKEN',
    );

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
            Authorization: `Bearer ${accessToken}`,
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
}
