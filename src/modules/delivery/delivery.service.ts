import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'prisma/generated';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}


  async create(data: UpdateDeliveryDto) {
  const requiredFields = [
    'senderName',
    'userId',
    'senderPhone',
    'senderAddress',
    'receiverName',
    'receiverPhone',
    'receiverAddress',
    'packageName',
    'packageCategory',
    'packageWeight',
    'packageDimensions',
    'packageValue',
    'pickupDate',
    'deliveryType',
  ] as const;

  const missingFields = requiredFields.filter(
    (field) =>
      data[field] === undefined ||
      data[field] === null ||
      data[field] === '',
  );

  if (missingFields.length > 0) {
    throw new BadRequestException(
      `Missing required fields: ${missingFields.join(', ')}`,
    );
  }

  return this.prisma.delivery.create({
    data: {
      ...(data as Prisma.DeliveryCreateInput),
      trackingId: `SD${Math.floor(10000 + Math.random() * 90000)}`,
      updatedAt: new Date(),
    },
  });
}

  async update(id: string, data: Prisma.DeliveryUpdateInput) {
    try {
      return await this.prisma.delivery.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Delivery with id ${id} was not found`);
      }

      throw error;
    }
  }

  async getDeliveriesByUserId(userId: string) {
    return this.prisma.delivery.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDeliveries() {
    const deliveries = await this.prisma.delivery.findMany();
    return deliveries;
  }
}
