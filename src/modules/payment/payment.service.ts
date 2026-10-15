import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
// import { BachsCreateCheckoutSessionDto, BachsCreatePayoutDestinationDto, BachsCreatePayoutDto, BachsCreatePayoutQuoteDto, BachsCreateProductDto, BachsCreateTransferDto, BachsCustomerDto, BachsResolveBankAccountDto, BachsResolvePayoutAccountDto, BachsUpdateCustomerDto, BachsUpdatePayoutDestinationDto, BachsUpdateProductDto } from './dto/payment.dto';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { BachsCreateCheckoutSessionDto, BachsCreatePayoutDestinationDto, BachsCreatePayoutDto, BachsCreatePayoutQuoteDto, BachsCreateProductDto, BachsCreateTransferDto, BachsCustomerDto, BachsResolveBankAccountDto, BachsResolvePayoutAccountDto, BachsUpdateCustomerDto, BachsUpdatePayoutDestinationDto, BachsUpdateProductDto } from './payment.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BachsService {
  private readonly bachsBaseUrl = 'https://sandbox-api.bachs.io/v1';
  private readonly secretKey = process.env.BACHS_API_KEY;
  private readonly logger = new Logger(BachsService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async createCustomer(dto: BachsCustomerDto): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await
        axios.post(`${this.bachsBaseUrl}/customers`, dto, {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        })

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data || 'Failed to create customer via Bachs API';

      throw new HttpException(message, status);
    }
  }

  async retrieveCustomer(customer_id: string): Promise<any> {
        const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await
        axios.get(`${this.bachsBaseUrl}/customers/${customer_id}`, {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        })

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data || 'Failed to retrieve customer via Bachs API';

      throw new HttpException(message, status);
    }
  }

  async updateCustomer(
    customerId: string,
    dto: BachsUpdateCustomerDto,
  ): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.patch(`${this.bachsBaseUrl}/customers/${customerId}`, dto, {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        })

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data || 'Failed to update customer via Bachs API';

      throw new HttpException(message, status);
    }
  }

  async findAllCustomers(): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.get(`${this.bachsBaseUrl}/customers`, {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        })

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data || 'Failed to fetch customers from Bachs API';

      throw new HttpException(message, status);
    }
  }

  async getReferenceBanks(): Promise<any> {
  const token = this.configService.get<string>('BACHS_API_KEY');

  try {
    const response = await axios.get(`${this.bachsBaseUrl}/reference/banks`, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });

    return response.data;
  } catch (error: any) {
    const status =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data || 'Failed to fetch reference banks from Bachs API';

    throw new HttpException(message, status);
  }
}

async resolveBankAccount(dto: BachsResolveBankAccountDto): Promise<any> {
  const token = this.configService.get<string>('BACHS_API_KEY');

  try {
    const response = await axios.post(
        `${this.bachsBaseUrl}/misc/bank-accounts/resolve`,
        dto,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        },
      )

    return response.data;
  } catch (error: any) {
    const status =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data || 'Failed to resolve bank account via Bachs API';

    throw new HttpException(message, status);
  }
}

async createPayoutQuote(dto: BachsCreatePayoutQuoteDto): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.post(`${this.bachsBaseUrl}/payouts/quotes`, dto, {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        });

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data || 'Failed to create payout quote via Bachs API';

      throw new HttpException(message, status);
    }
  }


  async createPayout(dto: BachsCreatePayoutDto): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.post(`${this.bachsBaseUrl}/payouts`, dto, {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        });

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data || 'Failed to initiate payout via Bachs API';

      throw new HttpException(message, status);
    }
  }

  async getPayoutById(withdrawalId: string): Promise<any> {

  try {
    const response = await axios.get(`${this.bachsBaseUrl}/payouts/${withdrawalId}`, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });

    return response.data;
  } catch (error: any) {
    const status =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data || 'Failed to fetch payout details from Bachs API';

    throw new HttpException(message, status);
  }
}

async findAllPayouts(): Promise<any> {
  const token = this.configService.get<string>('BACHS_API_KEY');

  try {
    const response = await axios.get(`${this.bachsBaseUrl}/payouts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    return response.data;
  } catch (error: any) {
    const status =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data || 'Failed to fetch payouts from Bachs API';

    throw new HttpException(message, status);
  }
}


async getPayoutBanks(): Promise<any> {
    try {
      const response = await axios.get(`${this.bachsBaseUrl}/payouts/banks`)

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data || 'Failed to fetch payout banks from Bachs API';

      throw new HttpException(message, status);
    }
  }

  async resolvePayoutAccount(dto: BachsResolvePayoutAccountDto): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.post(
          `${this.bachsBaseUrl}/payouts/resolve-account`,
          dto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data ||
        'Failed to resolve payout account via Bachs API';

      throw new HttpException(message, status);
    }
  }

  async getSupportedCurrencies(): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.get(`${this.bachsBaseUrl}/payouts/supported-currencies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data ||
        'Failed to fetch supported currencies from Bachs API';

      throw new HttpException(message, status);
    }
  }


  async createDestination(
    dto: BachsCreatePayoutDestinationDto,
  ): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.post(`${this.bachsBaseUrl}/payouts/destinations`, dto, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data ||
        'Failed to create payout destination via Bachs API';

      throw new HttpException(message, status);
    }
  }

  async listAllDestinations(): Promise<any> {
  const token = this.configService.get<string>('BACHS_API_KEY');

  try {
    const response = await axios.get(`${this.bachsBaseUrl}/payouts/destinations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    return response.data;
  } catch (error: any) {
    const status =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data ||
      'Failed to fetch payout destinations from Bachs API';

    throw new HttpException(message, status);
  }
}

async getDestinationById(destinationId: string): Promise<any> {
  const token = this.configService.get<string>('BACHS_API_KEY');

  try {
    const response = await axios.get(
        `${this.bachsBaseUrl}/payouts/destinations/${destinationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

    return response.data;
  } catch (error: any) {
    const status =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data ||
      'Failed to fetch payout destination from Bachs API';

    throw new HttpException(message, status);
  }
}

async updateDestination(
    destinationId: string,
    dto: BachsUpdatePayoutDestinationDto,
  ): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.patch(
          `${this.bachsBaseUrl}/payouts/destinations/${destinationId}`,
          dto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data ||
        'Failed to update payout destination via Bachs API';

      throw new HttpException(message, status);
    }
  }

  async deleteDestination(destinationId: string): Promise<any> {
  const token = this.configService.get<string>('BACHS_API_KEY');

  try {
    const response = await axios.delete(
        `${this.bachsBaseUrl}/payouts/destinations/${destinationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

    return response.data;
  } catch (error: any) {
    const status =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data ||
      'Failed to delete payout destination via Bachs API';

    throw new HttpException(message, status);
  }
}

async getPaymentMethods(): Promise<any> {
    try {
      const response = await axios.get(`${this.bachsBaseUrl}/payment-methods`)

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data ||
        'Failed to fetch payment methods from Bachs API';

      throw new HttpException(message, status);
    }
  }

  async getPaymentRails(): Promise<any> {
    try {
      const response = await axios.get(`${this.bachsBaseUrl}/payment-methods/rails`)

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data ||
        'Failed to fetch payment methods from Bachs API';

      throw new HttpException(message, status);
    }
  }

async getPaymentCurrencies(): Promise<any> {
    try {
      const response = await axios.get(`${this.bachsBaseUrl}/currencies/payout-supported`)

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data ||
        'Failed to fetch payment currencies from Bachs API';

      throw new HttpException(message, status);
    }
  }

  async getPaymentSupportedCurrencies(): Promise<any> {
    try {
      const response = await axios.get(`${this.bachsBaseUrl}/currencies/supported`)

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data ||
        'Failed to fetch payment currencies from Bachs API';

      throw new HttpException(message, status);
    }
  }

  async createTransfer(dto: BachsCreateTransferDto): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.post(`${this.bachsBaseUrl}/transfers`, dto, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data || 'Failed to initiate transfer via Bachs API';

      throw new HttpException(message, status);
    }
  }

  async findAllTransfers(): Promise<any> {
  const token = this.configService.get<string>('BACHS_API_KEY');

  try {
    const response = await axios.get(`${this.bachsBaseUrl}/transfers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    return response.data;
  } catch (error: any) {
    const status =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data || 'Failed to fetch transfers from Bachs API';

    throw new HttpException(message, status);
}
  }

  async getTransferById(transferId: string): Promise<any> {
  const token = this.configService.get<string>('BACHS_API_KEY');

  try {
    const response = await axios.get(`${this.bachsBaseUrl}/transfers/${transferId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    return response.data;
  } catch (error: any) {
    const status =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data || 'Failed to fetch transfer details from Bachs API';

    throw new HttpException(message, status);
  }
}

async createCheckoutSession(
    dto: BachsCreateCheckoutSessionDto,
  ): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.post(`${this.bachsBaseUrl}/checkout-sessions`, dto, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data ||
        'Failed to create checkout session via Bachs API';

      throw new HttpException(message, status);
    }
  }

  async getCheckoutSessionById(checkoutId: string): Promise<any> {
  const token = this.configService.get<string>('BACHS_API_KEY');

  try {
    const response = await axios.get(
        `${this.bachsBaseUrl}/checkout-sessions/${checkoutId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

    return response.data;
  } catch (error: any) {
    const status =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data ||
      'Failed to fetch checkout session details from Bachs API';

    throw new HttpException(message, status);
  }
}

async createProduct(dto: BachsCreateProductDto): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.post(`${this.bachsBaseUrl}/products`, dto, {
          headers: {
            Authorization: `Bearer ${process.env.BACHS_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data || 'Failed to create product via Bachs API';

      throw new HttpException(message, status);
    }
  }

  async getProductById(productId: string): Promise<any> {
  const token = this.configService.get<string>('BACHS_API_KEY');

  try {
    const response = await axios.get(`${this.bachsBaseUrl}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    return response.data;
  } catch (error: any) {
    const status =
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data || 'Failed to fetch product details from Bachs API';

    throw new HttpException(message, status);
  }
}

async updateProduct(
    productId: string,
    dto: BachsUpdateProductDto,
  ): Promise<any> {
    const token = this.configService.get<string>('BACHS_API_KEY');

    try {
      const response = await axios.patch(
          `${this.bachsBaseUrl}/products/${productId}`,
          dto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

      return response.data;
    } catch (error: any) {
      const status =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data ||
        'Failed to update product via Bachs API';

      throw new HttpException(message, status);
    }
  }






}
