import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AdminService } from './admin.service';
import { SuperAdminGuard } from '../../common/super-admin.guard';
import {
  AdminAdjustCreditsDto,
  AdminListQueryDto,
  AdminSetDetectionDto,
  AdminSetLogisticsProviderDto,
  AdminSetRoleDto,
  AdminSetSuspendedDto,
  AdminToggleAutomationDto,
  AdminUpdateDeliveryDto,
} from './dto/admin.dto';

type Authed = Request & { user: { id: string } };

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(AuthGuard('jwt'), SuperAdminGuard)
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('overview')
  overview() {
    return this.admin.overview();
  }

  // ---- Users ----
  @Get('users')
  users(@Query() q: AdminListQueryDto) {
    return this.admin.listUsers(q.search, q.page, q.limit);
  }

  @Get('users/:id')
  user(@Param('id') id: string) {
    return this.admin.getUser(id);
  }

  @Patch('users/:id/role')
  setRole(@Req() r: Authed, @Param('id') id: string, @Body() dto: AdminSetRoleDto) {
    return this.admin.setRole(r.user.id, id, dto.role);
  }

  // Grant/revoke LOGISTICS_PROVIDER status. Guarded by SuperAdminGuard (class-level) + service re-check.
  @Patch('users/:id/logistics-provider')
  setLogisticsProvider(@Req() r: Authed, @Param('id') id: string, @Body() dto: AdminSetLogisticsProviderDto) {
    return this.admin.setLogisticsProvider(r.user.id, id, dto.enabled);
  }

  @Patch('users/:id/suspend')
  setSuspended(@Req() r: Authed, @Param('id') id: string, @Body() dto: AdminSetSuspendedDto) {
    return this.admin.setSuspended(r.user.id, id, dto.suspended);
  }

  @Patch('users/:id/ai-detection')
  setDetection(@Req() r: Authed, @Param('id') id: string, @Body() dto: AdminSetDetectionDto) {
    return this.admin.setDetection(r.user.id, id, dto.aiDeliveryDetectionEnabled);
  }

  @Delete('users/:id')
  deleteUser(@Req() r: Authed, @Param('id') id: string) {
    return this.admin.deleteUser(r.user.id, id);
  }

  @Get('users/:id/transactions')
  userTransactions(@Param('id') id: string, @Query('limit') limit?: string) {
    return this.admin.walletTransactions(id, limit ? Number(limit) : 50);
  }

  // ---- Deliveries ----
  @Get('deliveries')
  deliveries(@Query() q: AdminListQueryDto & { status?: string }) {
    return this.admin.listDeliveries(q.search, q.status, q.page, q.limit);
  }

  @Get('deliveries/:id')
  delivery(@Param('id') id: string) {
    return this.admin.getDelivery(id);
  }

  @Patch('deliveries/:id')
  updateDelivery(@Req() r: Authed, @Param('id') id: string, @Body() dto: AdminUpdateDeliveryDto) {
    return this.admin.updateDelivery(r.user.id, id, dto);
  }

  @Post('deliveries/:id/cancel')
  cancelDelivery(@Req() r: Authed, @Param('id') id: string) {
    return this.admin.cancelDelivery(r.user.id, id);
  }

  @Delete('deliveries/:id')
  deleteDelivery(@Req() r: Authed, @Param('id') id: string) {
    return this.admin.deleteDelivery(r.user.id, id);
  }

  // ---- Billing ----
  @Get('billing/overview')
  billing(@Query() q: AdminListQueryDto) {
    return this.admin.billingOverview(q.search, q.page, q.limit);
  }

  @Post('users/:id/credits/adjust')
  adjustCredits(@Req() r: Authed, @Param('id') id: string, @Body() dto: AdminAdjustCreditsDto) {
    return this.admin.adjustCredits(r.user.id, id, dto.amount, dto.description);
  }

  // ---- Notifications ----
  @Get('notifications')
  notifications(@Query() q: AdminListQueryDto & { status?: string }) {
    return this.admin.listNotifications(q.search, q.status, q.page, q.limit);
  }

  // ---- Templates ----
  @Get('templates')
  templates(@Query() q: AdminListQueryDto & { status?: string }) {
    return this.admin.listTemplates(q.search, q.status, q.page, q.limit);
  }

  @Delete('templates/:id')
  deleteTemplate(@Req() r: Authed, @Param('id') id: string) {
    return this.admin.deleteTemplate(r.user.id, id);
  }

  // ---- Automations ----
  @Get('automations')
  automations(@Query() q: AdminListQueryDto & { enabled?: string }) {
    const enabled = q.enabled === undefined || q.enabled === '' ? undefined : q.enabled === 'true';
    return this.admin.listAutomations(q.search, enabled, q.page, q.limit);
  }

  @Patch('automations/:id')
  toggleAutomation(@Req() r: Authed, @Param('id') id: string, @Body() dto: AdminToggleAutomationDto) {
    return this.admin.toggleAutomation(r.user.id, id, dto.enabled);
  }

  @Delete('automations/:id')
  deleteAutomation(@Req() r: Authed, @Param('id') id: string) {
    return this.admin.deleteAutomation(r.user.id, id);
  }

  // ---- WhatsApp ----
  @Get('whatsapp/connections')
  whatsapp(@Query() q: AdminListQueryDto) {
    return this.admin.listWhatsappConnections(q.search, q.page, q.limit);
  }

  @Get('whatsapp/activity')
  whatsappActivity(@Query('userId') userId?: string, @Query('limit') limit?: string) {
    return this.admin.whatsappActivity(userId, limit ? Number(limit) : 50);
  }

  @Post('whatsapp/:userId/disconnect')
  disconnectWhatsapp(@Req() r: Authed, @Param('userId') userId: string) {
    return this.admin.disconnectWhatsapp(r.user.id, userId);
  }

  // ---- AI agents ----
  @Get('ai/agents')
  aiAgents(@Query() q: AdminListQueryDto) {
    return this.admin.aiAgents(q.search, q.page, q.limit);
  }

  @Get('ai/conversations/:id')
  aiConversation(@Param('id') id: string) {
    return this.admin.aiConversationDetail(id);
  }
}
