import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuperAdminGuard } from '../../common/super-admin.guard';
import * as dto from './dto/shared-network.dto';
import { SharedNetworkService } from './shared-network.service';

type AuthedRequest = { user: { id: string } };

@ApiTags('Shared Delivery Network (public)')
@Controller('public/shared-network')
export class SharedNetworkPublicController {
  constructor(private svc: SharedNetworkService) { }
  // Public pricing for the marketing page (/shared-network-info) — paid plans only, no business data.
  @Get('plans') plans() { return this.svc.listPlans(); }
  @Get('status') status() { return this.svc.getNetworkSetting(); }
}

@ApiTags('Shared Delivery Network')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('shared-network')
export class SharedNetworkController {
  constructor(private svc: SharedNetworkService) { }
  @Get('plans') plans() { return this.svc.listPlans(); }
  @Get('status') status() { return this.svc.getNetworkSetting(); }
  @Post('business') createBusiness(@Req() r: AuthedRequest, @Body() d: dto.CreateNetworkBusinessDto) { return this.svc.createBusiness(r.user.id, d); }
  @Get('business') business(@Req() r: AuthedRequest) { return this.svc.getBusiness(r.user.id); }
  @Patch('business') updateBusiness(@Req() r: AuthedRequest, @Body() d: dto.UpdateNetworkBusinessDto) { return this.svc.updateBusiness(r.user.id, d); }
  @Post('subscriptions') createSub(@Req() r: AuthedRequest, @Body() d: dto.CreateSubscriptionDto) { return this.svc.createSubscription(r.user.id, d); }
  @Post('subscriptions/verify') verifySub(@Req() r: AuthedRequest, @Body() d: dto.VerifyCreditsDto) { return this.svc.verifySubscription(r.user.id, d.paymentReference); }
  @Get('subscriptions/current') currentSub(@Req() r: AuthedRequest) { return this.svc.currentSubscription(r.user.id); }
  @Patch('subscriptions/cancel') cancelSub(@Req() r: AuthedRequest) { return this.svc.cancelSubscription(r.user.id); }
  @Get('capacity/available') available(@Query() q: dto.AvailableCapacityQueryDto) { return this.svc.availableCapacity(q); }
  @Post('capacity/reservations') reserve(@Req() r: AuthedRequest, @Body() d: dto.CreateReservationDto) { return this.svc.createReservation(r.user.id, d); }
  @Get('capacity/reservations') reservations(@Req() r: AuthedRequest) { return this.svc.listReservations(r.user.id); }
  @Patch('capacity/reservations/:id') updateReservation(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.UpdateReservationDto) { return this.svc.updateReservation(r.user.id, id, d); }
  @Delete('capacity/reservations/:id') cancelReservation(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.cancelReservation(r.user.id, id); }
  @Get('slots') slots(@Req() r: AuthedRequest) { return this.svc.listSlots(r.user.id); }
  @Post('slots') createSlot(@Req() r: AuthedRequest, @Body() d: dto.CreateSlotDto) { return this.svc.createSlot(r.user.id, d); }
  @Post('slots/:id/book') book(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.BookSlotDto) { return this.svc.bookSlot(r.user.id, id, d); }
  @Delete('slots/:id/book') unbook(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.unbookSlot(r.user.id, id); }
  @Delete('slots/:id') deleteSlot(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.deleteSlot(r.user.id, id); }
  @Get('pools') pools(@Req() r: AuthedRequest, @Query('region') region?: string, @Query('window') window?: string, @Query('date') date?: string) { return this.svc.listPools(r.user.id, { region, window, date }); }
  @Post('pools') createPool(@Req() r: AuthedRequest, @Body() d: dto.CreatePoolDto) { return this.svc.createPool(r.user.id, d); }
  @Get('pools/:id') pool(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.getPool(r.user.id, id); }
  @Post('pools/:id/join') join(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.JoinPoolDto) { return this.svc.joinPool(r.user.id, id, d); }
  @Post('pools/:id/leave') leave(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.leavePool(r.user.id, id); }
  @Get('deliveries') deliveries(@Req() r: AuthedRequest) { return this.svc.myDeliveries(r.user.id); }
  @Get('billing/overview') billing(@Req() r: AuthedRequest) { return this.svc.billingOverview(r.user.id); }
  @Get('billing/transactions') txns(@Req() r: AuthedRequest) { return this.svc.listTransactions(r.user.id); }
  @Get('credits') credits(@Req() r: AuthedRequest) { return this.svc.getCredits(r.user.id); }
  @Get('invoices') invoices(@Req() r: AuthedRequest) { return this.svc.listInvoices(r.user.id); }
  @Get('analytics/overview') analytics(@Req() r: AuthedRequest) { return this.svc.analytics(r.user.id); }
  @Get('analytics/savings') async savings(@Req() r: AuthedRequest) { const a = await this.svc.analytics(r.user.id); return { estimatedSavingsKobo: a.estimatedSavingsKobo, pooledDeliveries: a.pooledDeliveries }; }
  @Get('analytics/utilization') async utilization(@Req() r: AuthedRequest) { const a = await this.svc.analytics(r.user.id); return { reservedCapacity: a.reservedCapacity, usedCapacity: a.usedCapacity, usageByType: a.usageByType }; }
  @Post('ai/recommend') recommend(@Req() r: AuthedRequest, @Body() d: dto.AiRecommendDto) { return this.svc.recommend(r.user.id, d); }
}

@ApiTags('Shared Delivery Network Admin')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), SuperAdminGuard)
@Controller('admin/shared-network')
export class SharedNetworkAdminController {
  constructor(private svc: SharedNetworkService) { }
  @Get('overview') overview() { return this.svc.adminOverview(); }
  @Get('settings') settings() { return this.svc.getNetworkSetting(); }
  @Patch('settings/network-enabled') setEnabled(@Req() r: AuthedRequest, @Body() d: dto.AdminNetworkEnabledDto) { return this.svc.adminSetNetworkEnabled(r.user.id, d.enabled, d.disabledMessage); }
  @Get('businesses') businesses() { return this.svc.adminBusinesses(); }
  @Patch('businesses/:id/access') setBusinessAccess(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.AdminBusinessAccessDto) { return this.svc.adminSetBusinessAccess(r.user.id, id, d.enabled); }
  @Patch('businesses/:id/status') setBusinessStatus(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.AdminBusinessStatusDto) { return this.svc.adminSetBusinessStatus(r.user.id, id, d.status); }
  @Get('plans') plans() { return this.svc.listPlans(); }
  @Post('plans') createPlan(@Req() r: AuthedRequest, @Body() d: dto.AdminUpsertPlanDto) { return this.svc.adminUpsertPlan(r.user.id, null, d); }
  @Patch('plans/:id') updatePlan(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.AdminUpsertPlanDto) { return this.svc.adminUpsertPlan(r.user.id, id, d); }
  @Post('credits/adjust') adjust(@Req() r: AuthedRequest, @Body() d: dto.AdminAdjustCreditsDto) { return this.svc.adminAdjustCredits(r.user.id, d); }
  @Post('capacity') capacity(@Req() r: AuthedRequest, @Body() d: dto.AdminCapacityDto) { return this.svc.adminUpsertCapacity(r.user.id, d); }
  @Get('pools') pools() { return this.svc.adminPools(); }
  @Get('transactions') txns() { return this.svc.adminTransactions(); }
  @Get('audit') audit() { return this.svc.adminAudit(); }
  @Post('reservations/:id/refund') refund(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.adminRefundReservation(r.user.id, id); }
}
