import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AccessTokenDto, MessageDto, WebhookSubscriptionDto } from './dto/whatsapp.dto';
import { CreateMessageTemplateDto } from './dto/create-message-template.dto';
import { SendUtilityMessageDto } from './dto/send-utility-message.dto';
import { SendOrderConfirmationDto } from './dto/send-order-confirmation.dto';
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

export interface SendAutomationTemplateInput {
  userId: string;
  to: string;
  templateName: string;
  templateId?: string;
  trackingId: string;
  customerName: string;
  status: string;
  pickupDate?: string;
  trackingUrl?: string;
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
  async getAccessToken(dto: AccessTokenDto): Promise<string> {
    const endpoint = 'https://graph.facebook.com/v25.0/oauth/access_token';
    // const appId = this.configService.get<string>('WHATSAPP_APP_ID');
    // const appSecret = this.configService.get<string>('WHATSAPP_APP_SECRET');

    if (!dto.appId || !dto.appSecret) {
      throw new Error(
        'WHATSAPP_APP_ID and WHATSAPP_APP_SECRET are required',
      );
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(endpoint, {
          params: {
            client_id: dto.appId,
            client_secret: dto.appSecret,
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

  async getLongLivedToken(accessToken: string, userId: string): Promise<any> {
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

      await this.saveToken({userId: userId, facebookAccessToken: accessToken, facebookLongLivedAccessToken: longLivedToken })


      return { accessToken: longLivedToken };
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async getSettings(phoneNumberId: string): Promise<any> {

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
        this.httpService.get(`https://graph.facebook.com/${phoneNumberId}/settings`, {
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

  async subscribeToWebhooks(dto: WebhookSubscriptionDto) {
    // fetch accessToken with userId
    let find_acess_token = await this.prisma.user.findFirst({
      where: {id: dto.userId}
    })
        const endpoint = `https://graph.facebook.com/v25.0/${find_acess_token?.selectedFacebookBusinessId}/subscribed_apps`;
        const body = {
          override_callback_uri: dto.override_callback_uri,
          verify_token: dto.verify_token
        }

    try {
      const response = await firstValueFrom(
        this.httpService.post(endpoint, body, {
          headers: {
            Authorization: `Bearer ${find_acess_token?.facebookAcceessToken}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

    async getAllWabaSubscriptions(userId: string) {
    // fetch accessToken with userId
    let find_acess_token = await this.prisma.user.findFirst({
      where: {id: userId}
    })
        const endpoint = `https://graph.facebook.com/v25.0/${find_acess_token?.selectedFacebookBusinessId}/subscribed_apps`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(endpoint, {
          headers: {
            Authorization: `Bearer ${find_acess_token?.facebookAcceessToken}`,
            'Content-Type': 'application/json',
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

  async getMessageTemplates(userId: string, status?: string): Promise<any> {
  try {
    const version =
      this.configService.get<string>('WHATSAPP_VERSION');

    if (!version) {
      throw new BadRequestException(
        'WHATSAPP_VERSION is required',
      );
    }

    if (!userId) {
      throw new BadRequestException(
        'User ID is required',
      );
    }

    // Get current user
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${userId} not found`,
      );
    }

    // Prefer the WABA selected during Embedded Signup.
    const businessAccountId =
      user.selectedWabaId ||
      this.configService.get<string>('WABA_ID');

    if (!businessAccountId) {
      throw new BadRequestException(
        'No WhatsApp Business Account is connected to this user',
      );
    }

    // Get this user's Facebook token
    const token = await this.prisma.token.findUnique({
      where: {
        userId,
      },
    });

    if (!token?.facebookLongLivedAccessToken) {
      throw new BadRequestException(
        'Facebook long-lived access token not found for this user',
      );
    }

    const endpoint =
      `https://graph.facebook.com/${version}/${businessAccountId}/message_templates?status=${status}`;

       const queryParams: any = {
      fields: 'name,status,language,category,quality_score,previous_category,parameter_format,components,disable_ios_autofill,is_primary_device_delivery_only',
    };

      if (status) {
      queryParams.status = status.toUpperCase(); // Ensure it matches Meta formatting (e.g., 'APPROVED')
    }

    const response = await firstValueFrom(
      this.httpService.get(endpoint, {
        headers: {
          Authorization:
            `Bearer ${token.facebookLongLivedAccessToken}`,
        },
        params: queryParams,
      }),
    );

    const templates = response.data?.data ?? [];

    console.log(templates, 'log templates for whatsapp.');

    if (!Array.isArray(templates)) {
      throw new BadRequestException(
        'Invalid message templates response from Facebook',
      );
    }

    /**
     * Remove duplicate templates returned by Meta.
     * metaTemplateId is used as the unique identifier.
     */
    const uniqueTemplates = Array.from(
      new Map(
        templates
          .filter((template: any) => template?.id)
          .map((template: any) => [
            String(template.id),
            template,
          ]),
      ).values(),
    ) as any[];

    /**
     * Upsert means:
     *
     * - Existing template -> update it
     * - New template      -> create it
     *
     * Therefore the same Meta template will not be
     * inserted multiple times for the same user.
     */
    const savedTemplates = await Promise.all(
      uniqueTemplates.map(async (template: any) => {
        return this.prisma.messageTemplate.upsert({
          where: {
            userId_metaTemplateId: {
              userId,
              metaTemplateId: String(template.id),
            },
          },

          update: {
            name: template.name,
            language: template.language,
            status: template.status,
            category: template.category,

            previousCategory:
              template.previous_category ?? null,

            parameterFormat:
              template.parameter_format ?? null,

            components:
              template.components ?? [],

            disableIosAutofill:
              template.disable_ios_autofill ?? false,

            isPrimaryDeviceDeliveryOnly:
              template.is_primary_device_delivery_only ??
              false,
          },

          create: {
            metaTemplateId: String(template.id),
            userId,

            name: template.name,
            language: template.language,
            status: template.status,
            category: template.category,

            previousCategory:
              template.previous_category ?? null,

            parameterFormat:
              template.parameter_format ?? null,

            components:
              template.components ?? [],

            disableIosAutofill:
              template.disable_ios_autofill ?? false,

            isPrimaryDeviceDeliveryOnly:
              template.is_primary_device_delivery_only ??
              false,
          },
        });
      }),
    );

    return {
      data: uniqueTemplates,
      paging: response.data?.paging,
      savedTemplates: savedTemplates.length,
    };
  } catch (error: any) {
    console.error(
      'Get message templates error:',
      error.response?.data || error,
    );

    if (error instanceof HttpException) {
      throw error;
    }

    throw new InternalServerErrorException(
      error.response?.data?.error?.message ||
        error.message ||
        'Failed to fetch message templates',
    );
  }
}

async getAllMessageTemplates(userId: string): Promise<{ data: any[]; count: number }> {
  const version = this.configService.get<string>('WHATSAPP_VERSION');

  if (!version) {
    throw new BadRequestException('WHATSAPP_VERSION is required');
  }

  if (!userId) {
    throw new BadRequestException('User ID is required');
  }

  try {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const businessAccountId =
      user.selectedWabaId ||
      this.configService.get<string>('WABA_ID');

    if (!businessAccountId) {
      throw new BadRequestException(
        'No WhatsApp Business Account is connected to this user',
      );
    }

    const token = await this.prisma.token.findUnique({
      where: { userId },
    });

    if (!token?.facebookLongLivedAccessToken) {
      throw new BadRequestException(
        'Facebook long-lived access token not found for this user',
      );
    }

    const endpoint =
      `https://graph.facebook.com/${version}/${businessAccountId}/message_templates`;
    const headers = {
      Authorization: `Bearer ${token.facebookLongLivedAccessToken}`,
    };
    const params = {
      fields:
        'name,status,language,category,quality_score,previous_category,parameter_format,components,disable_ios_autofill,is_primary_device_delivery_only',
      limit: '100',
    };

    const templates: any[] = [];
    const seenIds = new Set<string>();
    const seenPageUrls = new Set<string>();
    let nextUrl: string | undefined;

    do {
      const requestUrl = nextUrl ?? endpoint;
      if (seenPageUrls.has(requestUrl)) {
        throw new BadRequestException(
          'Facebook returned a repeated message templates pagination URL',
        );
      }
      seenPageUrls.add(requestUrl);

      const response = await firstValueFrom(this.httpService.get(requestUrl, {
        headers,
        ...(nextUrl ? {} : { params }),
      }));
      const pageTemplates = response.data?.data;

      if (!Array.isArray(pageTemplates)) {
        throw new BadRequestException(
          'Invalid message templates response from Facebook',
        );
      }

      for (const template of pageTemplates) {
        if (template?.id) {
          const id = String(template.id);
          if (!seenIds.has(id)) {
            seenIds.add(id);
            templates.push(template);
          }
        }
      }

      nextUrl = response.data?.paging?.next;
      if (nextUrl) {
        const parsedNextUrl = new URL(nextUrl);
        const parsedEndpoint = new URL(endpoint);
        if (
          parsedNextUrl.origin !== parsedEndpoint.origin ||
          parsedNextUrl.pathname !== parsedEndpoint.pathname
        ) {
          throw new BadRequestException(
            'Facebook returned an invalid message templates pagination URL',
          );
        }
      }
    } while (nextUrl);

    return { data: templates, count: templates.length };
  } catch (error: any) {
    if (error instanceof HttpException) {
      throw error;
    }

    throw new InternalServerErrorException(
      error.response?.data?.error?.message ||
        error.message ||
        'Failed to fetch all message templates',
    );
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


async getWabaAssignerToUserId(userId: string) {
  const user = await this.prisma.user.findFirst({
    where: {
      metaUserId: userId,
    },
    select: {
      id: true,
      metaUserId: true,
      facebookAcceessToken: true,
    },
  });

  if (!user) {
    throw new NotFoundException(
      `No user found with Meta user ID: ${userId}`,
    );
  }

  if (!user.facebookAcceessToken) {
    throw new UnauthorizedException(
      'User does not have a Facebook access token',
    );
  }

  const response = await fetch(
    `https://graph.facebook.com/${user.metaUserId}/assigned_whatsapp_business_accounts`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.facebookAcceessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new BadRequestException({
      message: 'Failed to fetch assigned WhatsApp Business Accounts',
      error: data,
    });
  }

  return data;
}

  async sendAutomationTemplate(
    input: SendAutomationTemplateInput,
  ): Promise<any> {
    const template = await this.prisma.messageTemplate.findFirst({
      where: {
        userId: input.userId,
        name: input.templateName,
        ...(input.templateId ? { metaTemplateId: input.templateId } : {}),
        status: 'APPROVED',
      },
      orderBy: { updatedAt: 'desc' },
    });
    if (!template) {
      throw new NotFoundException(
        `Approved WhatsApp template "${input.templateName}" was not found for this user`,
      );
    }

    const rawComponents: unknown = template.components;
    const templateComponents = Array.isArray(rawComponents)
      ? rawComponents.filter(
          (component): component is Record<string, unknown> =>
            typeof component === 'object' &&
            component !== null &&
            !Array.isArray(component),
        )
      : [];
    const bodyTemplate = templateComponents.find(
      (component) => component.type === 'BODY',
    );
    const bodyText =
      typeof bodyTemplate?.text === 'string' ? bodyTemplate.text : '';
    const firstName = input.customerName.trim().split(/\s+/)[0];
    const values = [firstName, input.trackingId, input.status];
    const namedValues: Record<string, string> = {
      name: firstName,
      firstname: firstName,
      customername: firstName,
      recipientname: firstName,
      trackingid: input.trackingId,
      orderid: input.trackingId,
      reference: input.trackingId,
      date: input.pickupDate ?? '',
      pickupdate: input.pickupDate ?? '',
      deliverydate: input.pickupDate ?? '',
      status: input.status,
      shipmentstatus: input.status,
      trackinglink: input.trackingUrl ?? '',
      trackingurl: input.trackingUrl ?? '',
      link: input.trackingUrl ?? '',
      url: input.trackingUrl ?? '',
    };
    const resolveValue = (placeholder: string) => {
      const normalizedPlaceholder = placeholder
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
      const index = Number(placeholder);
      const isPositionalPlaceholder =
        /^\d+$/.test(placeholder) && Number.isInteger(index) && index > 0;

      if (isPositionalPlaceholder) {
        return values[index - 1];
      }

      return namedValues[normalizedPlaceholder] || undefined;
    };
    const getParameters = (text: string, componentName: string) => {
      const placeholders = Array.from(
        text.matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g),
        (match) => match[1].trim(),
      );

      return placeholders.map((placeholder) => {
        const value = resolveValue(placeholder);
        if (value === undefined) {
          throw new BadRequestException(
            `Template "${input.templateName}" has an unsupported ${componentName} parameter "{{${placeholder}}}"`,
          );
        }

        return {
          type: 'text' as const,
          ...(!/^\d+$/.test(placeholder)
            ? { parameter_name: placeholder }
            : {}),
          text: value,
        };
      });
    };

    const components: NonNullable<SendUtilityMessageDto['components']> = [];
    for (const type of ['HEADER', 'BODY'] as const) {
      const source = templateComponents.find(
        (component) => component.type === type,
      );
      if (typeof source?.text !== 'string') {
        continue;
      }

      const parameters = getParameters(source.text, type);
      if (parameters.length) {
        components.push({
          type: type.toLowerCase() as 'header' | 'body',
          parameters,
        });
      }
    }

    for (const templateComponent of templateComponents) {
      if (templateComponent.type !== 'BUTTONS') {
        continue;
      }

      const buttons = Array.isArray(templateComponent.buttons)
        ? templateComponent.buttons.filter(
            (button): button is Record<string, unknown> =>
              typeof button === 'object' &&
              button !== null &&
              !Array.isArray(button),
          )
        : [];
      buttons.forEach((button, index) => {
        if (
          button.type !== 'URL' ||
          typeof button.url !== 'string'
        ) {
          return;
        }
        const parameters = getParameters(button.url, `button ${index + 1}`);
        if (parameters.length) {
          components.push({
            type: 'button',
            sub_type: 'url',
            index: String(index),
            parameters,
          });
        }
      });
    }

    const renderedMessage = bodyText.replace(
      /\{\{\s*([^{}]+?)\s*\}\}/g,
      (placeholder, variable: string) => {
        return resolveValue(variable.trim()) ?? placeholder;
      },
    );
    const digitsOnlyPhone = input.to.replace(/\D/g, '');
    const recipientPhone = digitsOnlyPhone.startsWith('0')
      ? `234${digitsOnlyPhone.slice(1)}`
      : digitsOnlyPhone;
    if (!recipientPhone) {
      throw new BadRequestException('Recipient phone number is invalid');
    }

    const response = await this.sendUtilityMessage({
      userId: input.userId,
      to: recipientPhone,
      templateName: template.name,
      templateLanguage: template.language,
      ...(components.length ? { components } : {}),
    });
    const whatsappMessage = Array.isArray(response?.messages)
      ? response.messages[0]
      : undefined;

    await this.prisma.notification.create({
      data: {
        userId: input.userId,
        recipientPhone,
        templateName: template.name,
        templateLanguage: template.language,
        templateMessage: renderedMessage || null,
        whatsappMessageId:
          typeof whatsappMessage?.id === 'string'
            ? whatsappMessage.id
            : null,
        deliveryTrackingId: input.trackingId,
        sendAt: new Date().toISOString(),
        status:
          typeof whatsappMessage?.message_status === 'string'
            ? whatsappMessage.message_status
            : 'accepted',
      },
    });

    return response;
  }

  async sendOrderConfirmation(dto: SendOrderConfirmationDto): Promise<any> {
    const delivery = await this.prisma.delivery.findFirst({
      where: {
        userId: dto.userId,
        trackingId: dto.trackingId,
      },
      select: {
        userId: true,
        receiverPhone: true,
        trackingId: true,
      },
    });
    if (!delivery) {
      throw new NotFoundException(
        `Delivery with tracking ID ${dto.trackingId} was not found`,
      );
    }
    if (!delivery.userId) {
      throw new BadRequestException(
        `Delivery ${dto.trackingId} is not associated with a user`,
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: delivery.userId },
      select: { fullName: true },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${delivery.userId} not found`);
    }

    const firstName = user.fullName.trim().split(/\s+/)[0];
    if (!firstName) {
      throw new BadRequestException('The user does not have a first name');
    }

    const digitsOnlyPhone = delivery.receiverPhone.replace(/\D/g, '');
    if (!digitsOnlyPhone) {
      throw new BadRequestException(
        'The delivery receiver phone number is invalid',
      );
    }
    const recipientPhone = digitsOnlyPhone.startsWith('0')
      ? `234${digitsOnlyPhone.slice(1)}`
      : digitsOnlyPhone;

    const response = await this.sendUtilityMessage({
      userId: delivery.userId,
      to: recipientPhone,
      templateName: 'order_confirmed',
      templateLanguage: dto.templateLanguage,
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: firstName },
            { type: 'text', text: delivery.trackingId },
          ],
        },
      ],
    });

    const whatsappMessage = Array.isArray(response?.messages)
      ? response.messages[0]
      : undefined;
    const templateMessage =
      `Hi ${firstName}, \n` +
      `We're getting your order ${delivery.trackingId} ready and will let you know when it's on the way.`;

    await this.prisma.notification.create({
      data: {
        userId: delivery.userId,
        recipientPhone,
        templateName: 'order_confirmed',
        templateLanguage: dto.templateLanguage,
        templateMessage,
        whatsappMessageId:
          typeof whatsappMessage?.id === 'string'
            ? whatsappMessage.id
            : null,
        deliveryTrackingId: delivery.trackingId,
        sendAt: new Date().toISOString(),
        status:
          typeof whatsappMessage?.message_status === 'string'
            ? whatsappMessage.message_status
            : 'accepted',
      },
    });

    return response;
  }

  async sendUtilityMessage(dto: SendUtilityMessageDto): Promise<any> {
    console.log(dto, 'sendUtilityMessageDto');
    const version = this.configService.get<string>('WHATSAPP_VERSION');
    let phoneNumberId =
      this.configService.get<string>('WHATSAPP_BUSINESS_PHONE_NUMBER_ID');

    if (dto.userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.userId },
        select: { selectedPhoneNumberId: true },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${dto.userId} not found`);
      }
      phoneNumberId = user.selectedPhoneNumberId[0]?.trim();
    }

    const fetch_access_token = dto.userId
      ? await this.prisma.token.findUnique({ where: { userId: dto.userId } })
      : await this.prisma.token.findFirst({
          orderBy: { createdAt: 'desc' },
        });

    const accessToken =
      fetch_access_token?.facebookLongLivedAccessToken?.trim();
    if (!accessToken) {
      throw new UnauthorizedException(
        'No WhatsApp access token is configured for this user',
      );
    }

    if (!version) {
      throw new BadRequestException('WHATSAPP_VERSION is required');
    }

    if (!phoneNumberId) {
      throw new BadRequestException(
        dto.userId
          ? 'A WhatsApp phone number must be selected for this user'
          : 'WHATSAPP_BUSINESS_PHONE_NUMBER_ID is required',
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
    } catch (error: unknown) {
      const axiosError = error as {
        message?: string;
        response?: {
          status?: number;
          data?: unknown;
        };
      };
      const responseData =
        typeof axiosError.response?.data === 'object' &&
        axiosError.response.data !== null
          ? (axiosError.response.data as Record<string, unknown>)
          : undefined;
      const graphError =
        typeof responseData?.error === 'object' &&
        responseData.error !== null
          ? (responseData.error as Record<string, unknown>)
          : responseData;
      const graphMessage =
        typeof graphError?.message === 'string'
          ? graphError.message
          : axiosError.message ?? 'Unknown WhatsApp API error';
      const graphCode =
        typeof graphError?.code === 'number' ||
        typeof graphError?.code === 'string'
          ? graphError.code
          : undefined;
      const traceId =
        typeof graphError?.fbtrace_id === 'string'
          ? graphError.fbtrace_id
          : undefined;

      console.error(
        'WhatsApp Graph API message send failed',
        JSON.stringify(
          {
            status: axiosError.response?.status,
            message: graphMessage,
            code: graphCode,
            fbtrace_id: traceId,
          },
          null,
          2,
        ),
      );

      const diagnostics = [
        graphCode !== undefined ? `code ${graphCode}` : undefined,
        traceId ? `trace ID ${traceId}` : undefined,
      ].filter((value): value is string => Boolean(value));
      throw new BadRequestException(
        `WhatsApp Graph API rejected the message: ${graphMessage}${
          diagnostics.length ? ` (${diagnostics.join(', ')})` : ''
        }`,
      );
    }
  }

  async saveToken(dto: TokenDto): Promise<void> {
  try {
    await this.prisma.token.upsert({
      where: {
        userId: dto.userId,
      },
      update: {
        facebookAccessToken: dto.facebookAccessToken,
        facebookLongLivedAccessToken: dto.facebookLongLivedAccessToken,
      },
      create: {
        userId: dto.userId,
        facebookAccessToken: dto.facebookAccessToken,
        facebookLongLivedAccessToken: dto.facebookLongLivedAccessToken,
      },
    });
  } catch (error) {
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
