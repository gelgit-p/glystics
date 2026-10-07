import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import {
  AutomationService,
  CreateAutomationDto,
  UpdateAutomationDto,
} from './automation.service';

@Controller('automations')
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
    @Body() body: CreateAutomationDto,
  ) {
    const automation =
      await this.automationService.create(body);

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
    @Query('userId') userId: string,
  ) {
    const automations =
      await this.automationService.findAll(userId);

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
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    const automation =
      await this.automationService.findOne(
        id,
        userId,
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
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() body: UpdateAutomationDto,
  ) {
    const automation =
      await this.automationService.update(
        id,
        userId,
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
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    const automation =
      await this.automationService.toggle(
        id,
        userId,
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
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    return this.automationService.delete(
      id,
      userId,
    );
  }
}