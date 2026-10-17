import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAutomationDto, UpdateAutomationDto } from './dto/automation.dto';
import { WhatsappService } from '../whatsapp/whatsapp.service';

export interface ShipbubbleAutomationEvent {
  orderId: string;
  eventName:
    | 'shipment.label.created'
    | 'shipment.status.changed'
    | 'shipment.cancelled';
  status?: string;
}

@Injectable()
export class AutomationService {
  private readonly logger = new Logger(AutomationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly whatsappService: WhatsappService,
  ) {}

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

      if (
        data.trigger === 'Shipment status changes' &&
        !data.triggerValue?.trim()
      ) {
        throw new BadRequestException(
          'A shipment status is required for status-change automations',
        );
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

      await this.validateTemplateSelection(
        data.userId,
        data.action,
        data.actionTemplate,
      );

      return await this.prisma.automation.create({
        data: {
          userId: data.userId,
          name: data.name.trim(),
          trigger: data.trigger,
          triggerValue: data.triggerValue,
          action: data.action,
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
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
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

      const selectedAction = data.action ?? automation.action;
      const selectedTemplate = data.actionTemplate ?? automation.actionTemplate;
      const selectedTrigger = data.trigger ?? automation.trigger;
      const selectedTriggerValue =
        data.triggerValue !== undefined
          ? data.triggerValue
          : automation.triggerValue;
      if (
        selectedTrigger === 'Shipment status changes' &&
        !selectedTriggerValue?.trim()
      ) {
        throw new BadRequestException(
          'A shipment status is required for status-change automations',
        );
      }
      await this.validateTemplateSelection(
        userId,
        selectedAction,
        selectedTemplate,
      );

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
          ...(data.trigger !== undefined &&
            data.trigger !== 'Shipment status changes' && {
              triggerValue: null,
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
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
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

  private async validateTemplateSelection(
    userId: string,
    templateName: string,
    templateId: string,
  ): Promise<void> {
    const legacyTemplateSelection = templateName === 'Send WhatsApp template';
    const template = await this.prisma.messageTemplate.findFirst({
      where: {
        userId,
        ...(legacyTemplateSelection
          ? { name: templateId }
          : { name: templateName, metaTemplateId: templateId }),
        status: 'APPROVED',
      },
      select: { id: true },
    });

    if (!template) {
      throw new BadRequestException(
        'Selected WhatsApp template is not approved or does not belong to this user',
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

  async handleShipbubbleEvent(event: ShipbubbleAutomationEvent) {
    try {
      const delivery = await this.prisma.delivery.findFirst({
        where: { shipbubbleOrderId: event.orderId },
        select: {
          id: true,
          userId: true,
          receiverName: true,
          receiverPhone: true,
          trackingId: true,
        },
      });
      if (!delivery) {
        this.logger.warn(
          `Automation skipped: delivery for Shipbubble order ${event.orderId} was not found`,
        );
        return [];
      }
      if (!delivery.userId) {
        this.logger.warn(
          `Automation skipped: delivery ${delivery.id} has no user`,
        );
        return [];
      }

      const trigger =
        event.eventName === 'shipment.label.created'
          ? 'Shipment label created'
          : event.eventName === 'shipment.cancelled'
            ? 'Shipment cancelled'
            : 'Shipment status changes';
      const triggerValue =
        event.eventName === 'shipment.status.changed'
          ? this.normalizeShipmentStatus(event.status ?? '')
          : null;
      if (event.eventName === 'shipment.status.changed' && !event.status?.trim()) {
        this.logger.warn(
          `Automation skipped: ${event.eventName} has no status`,
        );
        return [];
      }
      const messageStatus =
        event.eventName === 'shipment.cancelled'
          ? 'Cancelled'
          : event.eventName === 'shipment.label.created'
            ? 'Label created'
            : triggerValue!;

      const matchingAutomations = await this.prisma.automation.findMany({
        where: {
          userId: delivery.userId,
          enabled: true,
          trigger,
        },
      });
      const automations =
        event.eventName === 'shipment.status.changed'
          ? matchingAutomations.filter(
              (automation) =>
                this.normalizeShipmentStatus(
                  automation.triggerValue ?? '',
                ) === triggerValue,
            )
          : matchingAutomations;
      if (!automations.length) {
        this.logger.log(
          `No enabled automation found for user ${delivery.userId} and event ${event.eventName}`,
        );
        return [];
      }

      const results: Array<{
        success: boolean;
        automationId: string;
        automationName: string;
        error?: string;
      }> = [];

      for (const automation of automations) {
        try {
          if (automation.action !== 'Send WhatsApp template') {
            throw new BadRequestException(
              `Unsupported automation action: ${automation.action}`,
            );
          }

          await this.whatsappService.sendAutomationTemplate({
            userId: delivery.userId,
            to: delivery.receiverPhone,
            templateName:
              automation.action === 'Send WhatsApp template'
                ? automation.actionTemplate
                : automation.action,
            templateId:
              automation.action === 'Send WhatsApp template'
                ? undefined
                : automation.actionTemplate,
            trackingId: delivery.trackingId,
            customerName: delivery.receiverName,
            status: messageStatus,
          });
          const updatedAutomation =
            await this.prisma.automation.update({
              where: {
                id: automation.id,
              },
              data: {
                totalRuns: {
                  increment: 1,
                },
                lastTriggered: new Date(),
              },
            });

          results.push({
            success: true,
            automationId: updatedAutomation.id,
            automationName: updatedAutomation.name,
          });

          this.logger.log(
            `Automation "${automation.name}" sent template "${automation.actionTemplate}" for ${event.eventName}`,
          );
        } catch (error) {
          this.logger.error(
            `Automation "${automation.name}" failed`,
            error instanceof Error
              ? error.stack
              : String(error),
          );

          results.push({
            success: false,
            automationId: automation.id,
            automationName: automation.name,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      return results;
    } catch (error) {
      this.logger.error(
        'Failed to handle shipment status change',
        error instanceof Error
          ? error.stack
          : String(error),
      );

      throw error;
    }
  }

  private normalizeShipmentStatus(
    status: string,
  ): string {
    const normalized = status
      .trim()
      .toLowerCase()
      .replace(/-/g, '_')
      .replace(/\s+/g, '_');

    const statuses: Record<string, string> = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      picked_up: 'Picked Up',
      pickup_scheduled: 'Pickup Scheduled',
      rider_assigned: 'Rider Assigned',
      in_transit: 'In Transit',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      failed: 'Failed',
      cancelled: 'Cancelled',
    };

    return statuses[normalized] ?? status.trim();
  }
}