import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import {
  AutomationService,
} from './automation.service';
import { CreateAutomationDto, UpdateAutomationDto } from './dto/automation.dto';

@Controller('automations')
@UseGuards(AuthGuard('jwt'))
export class AutomationController {
  constructor(
    private readonly automationService: AutomationService,
  ) {}

  /**
   * Create automation
   *
   * POST /automations
   */
  @Post()
  async create(
    @Req() request: Request & { user: { id: string } },
    @Body() body: CreateAutomationDto,
  ) {
    const automation =
      await this.automationService.create({ ...body, userId: request.user.id });

    return {
      success: true,
      message: 'Automation created successfully',
      data: automation,
    };
  }

  /**
   * Get automations belonging to user
   *
   * GET /automations?userId=xxx
   */
  @Get()
  async findAll(
    @Req() request: Request & { user: { id: string } },
  ) {
    const automations =
      await this.automationService.findAll(request.user.id);

    return {
      success: true,
      data: automations,
    };
  }

  /**
   * Get single automation
   *
   * GET /automations/:id?userId=xxx
   */
  @Get(':id')
  async findOne(
    @Req() request: Request & { user: { id: string } },
    @Param('id') id: string,
  ) {
    const automation =
      await this.automationService.findOne(
        id,
        request.user.id,
      );

    return {
      success: true,
      data: automation,
    };
  }

  /**
   * Update automation
   *
   * PUT /automations/:id?userId=xxx
   */
  @Put(':id')
  async update(
    @Req() request: Request & { user: { id: string } },
    @Param('id') id: string,
    @Body() body: UpdateAutomationDto,
  ) {
    const automation =
      await this.automationService.update(
        id,
        request.user.id,
        body,
      );

    return {
      success: true,
      message: 'Automation updated successfully',
      data: automation,
    };
  }

  /**
   * Enable/disable automation
   *
   * PATCH /automations/:id/toggle?userId=xxx
   */
  @Patch(':id/toggle')
  async toggle(
    @Req() request: Request & { user: { id: string } },
    @Param('id') id: string,
  ) {
    const automation =
      await this.automationService.toggle(
        id,
        request.user.id,
      );

    return {
      success: true,
      message: automation.enabled
        ? 'Automation enabled'
        : 'Automation disabled',
      data: automation,
    };
  }

  /**
   * Delete automation
   *
   * DELETE /automations/:id?userId=xxx
   */
  @Delete(':id')
  async delete(
    @Req() request: Request & { user: { id: string } },
    @Param('id') id: string,
  ) {
    return this.automationService.delete(
      id,
      request.user.id,
    );
  }
}