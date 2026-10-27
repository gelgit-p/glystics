import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AiDeliveryService } from './ai-delivery.service';
import { SuperAdminGuard } from '../../common/super-admin.guard';
import {
  AdminSetDetectionDto,
  AdminSetRoleDto,
  ApproveDraftDto,
  RejectDraftDto,
  SimulateInboundDto,
  UpdateAiSettingsDto,
  UpdateDraftDto,
} from './dto/ai-delivery.dto';

type Authed = Request & { user: { id: string } };

@ApiTags('Dispatchly AI')
@Controller('ai')
@UseGuards(AuthGuard('jwt'))
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class AiDeliveryController {
  constructor(private readonly service: AiDeliveryService) {}

  @Get('overview') overview(@Req() r: Authed) {
    return this.service.overview(r.user.id);
  }
  @Get('conversations') conversations(@Req() r: Authed) {
    return this.service.listConversations(r.user.id);
  }
  @Get('conversations/:id') conversation(
    @Req() r: Authed,
    @Param('id') id: string,
  ) {
    return this.service.getConversation(r.user.id, id);
  }
  @Get('drafts') drafts(@Req() r: Authed, @Query('status') status?: string) {
    return this.service.listDrafts(r.user.id, status);
  }
  @Get('drafts/:id') draft(@Req() r: Authed, @Param('id') id: string) {
    return this.service.getDraft(r.user.id, id);
  }
  @Patch('drafts/:id') updateDraft(
    @Req() r: Authed,
    @Param('id') id: string,
    @Body() dto: UpdateDraftDto,
  ) {
    return this.service.updateDraft(r.user.id, id, dto);
  }
  @Post('drafts/:id/quotes') quotes(@Req() r: Authed, @Param('id') id: string) {
    return this.service.fetchQuotes(r.user.id, id);
  }
  @Get('approvals') approvals(@Req() r: Authed) {
    return this.service.listApprovals(r.user.id);
  }
  @Post('drafts/:id/approve') approve(
    @Req() r: Authed,
    @Param('id') id: string,
    @Body() dto: ApproveDraftDto,
  ) {
    return this.service.approve(r.user.id, id, dto);
  }
  @Post('drafts/:id/reject') reject(
    @Req() r: Authed,
    @Param('id') id: string,
    @Body() dto: RejectDraftDto,
  ) {
    return this.service.reject(r.user.id, id, dto);
  }
  @Get('audit') audit(@Req() r: Authed) {
    return this.service.listAudit(r.user.id);
  }
  @Post('simulate-inbound') simulate(
    @Req() r: Authed,
    @Body() dto: SimulateInboundDto,
  ) {
    return this.service.simulateInbound(r.user.id, dto.text, dto.customerWaId);
  }
  @Post('process-pending') processPending() {
    return this.service.processPending();
  }

  // Per-tenant AI delivery detection switch (Automations tab)
  @Get('settings') settings(@Req() r: Authed) {
    return this.service.getSettings(r.user.id);
  }
  @Patch('settings') updateSettings(
    @Req() r: Authed,
    @Body() dto: UpdateAiSettingsDto,
  ) {
    return this.service.updateSettings(r.user.id, dto);
  }

  // ---- Super admin (role read from DB; promotion takes effect without re-login) ----
  @Get('admin/overview')
  @UseGuards(SuperAdminGuard)
  adminOverview() {
    return this.service.adminOverview();
  }
  @Get('admin/users')
  @UseGuards(SuperAdminGuard)
  adminUsers() {
    return this.service.adminListUsers();
  }
  @Patch('admin/users/:id/role')
  @UseGuards(SuperAdminGuard)
  adminSetRole(
    @Req() r: Authed,
    @Param('id') id: string,
    @Body() dto: AdminSetRoleDto,
  ) {
    return this.service.adminSetUserRole(r.user.id, id, dto.role);
  }
  @Patch('admin/users/:id/ai-detection')
  @UseGuards(SuperAdminGuard)
  adminSetDetection(
    @Req() r: Authed,
    @Param('id') id: string,
    @Body() dto: AdminSetDetectionDto,
  ) {
    return this.service.adminSetDetection(
      r.user.id,
      id,
      dto.aiDeliveryDetectionEnabled,
    );
  }
}
