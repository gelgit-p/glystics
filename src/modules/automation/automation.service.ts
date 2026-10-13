import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAutomationDto, UpdateAutomationDto } from './dto/automation.dto';

export interface ShipmentStatusChangeEvent {
  userId: string;
  deliveryId?: string;

  status: string;
  previousStatus?: string;

  receiverName: string;
  receiverPhone: string;

  trackingCode?: string;
}

@Injectable()
export class AutomationService {
  private readonly logger = new Logger(AutomationService.name);

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

  async handleShipmentStatusChange(
    event: ShipmentStatusChangeEvent,
  ) {
    try {
      const {
        userId,
        status,
        previousStatus,
        deliveryId,
        receiverName,
        receiverPhone,
        trackingCode,
      } = event;

      if (!userId) {
        this.logger.warn(
          'Automation skipped: userId is missing',
        );

        return [];
      }

      if (!status) {
        this.logger.warn(
          'Automation skipped: shipment status is missing',
        );

        return [];
      }

      /*
       * ShipBubble may return values such as:
       *
       * picked_up
       * in_transit
       * out_for_delivery
       * delivered
       * failed
       *
       * Your frontend currently stores:
       *
       * Picked Up
       * In Transit
       * Out for Delivery
       * Delivered
       * Failed
       *
       * Normalize before querying Prisma.
       */
      const triggerValue =
        this.normalizeShipmentStatus(status);

      this.logger.log(
        `Processing shipment status automation: ${status} -> ${triggerValue}`,
      );

      // Avoid running an automation when nothing actually changed.
      if (previousStatus) {
        const normalizedPreviousStatus =
          this.normalizeShipmentStatus(previousStatus);

        if (normalizedPreviousStatus === triggerValue) {
          this.logger.log(
            `Shipment status has not changed. Skipping automations.`,
          );

          return [];
        }
      }

      /*
       * Find automations belonging to THIS vendor only.
       *
       * Example:
       *
       * trigger      = "Shipment status changes"
       * triggerValue = "Picked Up"
       * enabled      = true
       */
      const automations =
        await this.prisma.automation.findMany({
          where: {
            userId,
            enabled: true,
            trigger: 'Shipment status changes',
            triggerValue,
          },
        });

      if (!automations.length) {
        this.logger.log(
          `No enabled automation found for user ${userId} and status "${triggerValue}"`,
        );

        return [];
      }

      this.logger.log(
        `Found ${automations.length} automation(s) for "${triggerValue}"`,
      );

      const results: Array<
        | {
            success: true;
            automationId: string;
            automationName: string;
            actionTemplate: string;
            deliveryId: string | undefined;
            trackingCode: string | undefined;
            receiverName: string;
            receiverPhone: string;
            status: string;
            totalRuns: number;
          }
        | {
            success: false;
            automationId: string;
            automationName: string;
            error: string;
          }
      > = [];

      for (const automation of automations) {
        try {
          this.logger.log(
            `Executing automation: ${automation.name}`,
          );

          /*
           * At the moment your Automation model supports
           * an action string.
           *
           * We only execute the WhatsApp action here.
           */
          if (
            automation.action !==
            'Send WhatsApp template'
          ) {
            this.logger.warn(
              `Unsupported automation action: ${automation.action}`,
            );

            continue;
          }

          /*
           * TODO:
           * Call your existing WhatsApp sending function here.
           *
           * Example:
           *
           * await this.whatsappService.sendTemplate({
           *   userId,
           *   to: receiverPhone,
           *   templateName: automation.actionTemplate,
           *   variables: {
           *     customer_name: receiverName,
           *     delivery_status: triggerValue,
           *     tracking_code: trackingCode,
           *   },
           * });
           */

          this.logger.log(
            `Would send WhatsApp template "${automation.actionTemplate}" to ${receiverPhone}`,
          );

          /*
           * Only count the run after the action succeeds.
           */
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
            automationId: automation.id,
            automationName: automation.name,
            actionTemplate:
              automation.actionTemplate,
            deliveryId,
            trackingCode,
            receiverName,
            receiverPhone,
            status: triggerValue,
            totalRuns:
              updatedAutomation.totalRuns,
          });

          this.logger.log(
            `Automation "${automation.name}" completed successfully`,
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
            error:
              error instanceof Error
                ? error.message
                : 'Unknown error',
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
      picked_up: 'Picked Up',
      pickup_scheduled: 'Pickup Scheduled',
      rider_assigned: 'Rider Assigned',
      in_transit: 'In Transit',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      failed: 'Failed',
    };

    return statuses[normalized] ?? status;
  }
}