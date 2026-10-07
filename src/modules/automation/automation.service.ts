import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAutomationDto } from './dto/automation.dto';





@Injectable()
export class AutomationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAutomationDto) {
    try {
      if (!data.userId) {
        throw new BadRequestException('User ID is required');
      }

      if (!data.name?.trim()) {
        throw new BadRequestException('Automation name is required');
      }

      if (!data.trigger) {
        throw new BadRequestException('Automation trigger is required');
      }

      if (!data.actionTemplate) {
        throw new BadRequestException('WhatsApp template is required');
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: data.userId,
        },
      });

      if (!user) {
        throw new NotFoundException(
          `User with ID ${data.userId} not found`,
        );
      }

      return await this.prisma.automation.create({
        data: {
          userId: data.userId,
          name: data.name.trim(),
          trigger: data.trigger,
          triggerValue: data.triggerValue,
          action: data.action ?? 'Send WhatsApp template',
          actionTemplate: data.actionTemplate,
          enabled: data.enabled ?? true,
        },
      });
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      console.error('Create automation error:', error);

      throw new InternalServerErrorException(
        'Failed to create automation',
      );
    }
  }

  async findAll(userId: string) {
    try {
      if (!userId) {
        throw new BadRequestException('User ID is required');
      }

      return await this.prisma.automation.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Get automations error:', error);

      throw new InternalServerErrorException(
        'Failed to fetch automations',
      );
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const automation = await this.prisma.automation.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!automation) {
        throw new NotFoundException(
          `Automation with ID ${id} not found`,
        );
      }

      return automation;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Get automation error:', error);

      throw new InternalServerErrorException(
        'Failed to fetch automation',
      );
    }
  }

  async update(
    id: string,
    userId: string,
    data: UpdateAutomationDto,
  ) {
    try {
      const automation = await this.prisma.automation.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!automation) {
        throw new NotFoundException(
          `Automation with ID ${id} not found`,
        );
      }

      return await this.prisma.automation.update({
        where: {
          id,
        },
        data: {
          ...(data.name !== undefined && {
            name: data.name.trim(),
          }),

          ...(data.trigger !== undefined && {
            trigger: data.trigger,
          }),

          ...(data.triggerValue !== undefined && {
            triggerValue: data.triggerValue,
          }),

          ...(data.action !== undefined && {
            action: data.action,
          }),

          ...(data.actionTemplate !== undefined && {
            actionTemplate: data.actionTemplate,
          }),

          ...(data.enabled !== undefined && {
            enabled: data.enabled,
          }),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Update automation error:', error);

      throw new InternalServerErrorException(
        'Failed to update automation',
      );
    }
  }

  async toggle(id: string, userId: string) {
    try {
      const automation = await this.prisma.automation.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!automation) {
        throw new NotFoundException(
          `Automation with ID ${id} not found`,
        );
      }

      return await this.prisma.automation.update({
        where: {
          id,
        },
        data: {
          enabled: !automation.enabled,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Toggle automation error:', error);

      throw new InternalServerErrorException(
        'Failed to toggle automation',
      );
    }
  }

  async delete(id: string, userId: string) {
    try {
      const automation = await this.prisma.automation.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!automation) {
        throw new NotFoundException(
          `Automation with ID ${id} not found`,
        );
      }

      await this.prisma.automation.delete({
        where: {
          id,
        },
      });

      return {
        success: true,
        message: 'Automation deleted successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Delete automation error:', error);

      throw new InternalServerErrorException(
        'Failed to delete automation',
      );
    }
  }

  /**
   * Call after the WhatsApp notification has
   * successfully been sent.
   */
  async recordRun(id: string) {
    try {
      return await this.prisma.automation.update({
        where: {
          id,
        },
        data: {
          totalRuns: {
            increment: 1,
          },
          lastTriggered: new Date(),
        },
      });
    } catch (error) {
      console.error('Record automation run error:', error);

      throw new InternalServerErrorException(
        'Failed to record automation run',
      );
    }
  }

  /**
   * Used by your ShipBubble webhook to find
   * automations matching a shipment status.
   */
  async findMatchingAutomations(
    userId: string,
    triggerValue: string,
  ) {
    try {
      return await this.prisma.automation.findMany({
        where: {
          userId,
          enabled: true,
          triggerValue,
        },
      });
    } catch (error) {
      console.error('Find matching automations error:', error);

      throw new InternalServerErrorException(
        'Failed to find matching automations',
      );
    }
  }
}