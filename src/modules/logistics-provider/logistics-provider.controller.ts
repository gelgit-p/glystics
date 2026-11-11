import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogisticsProviderGuard } from '../../common/logistics-provider.guard';
import { SuperAdminGuard } from '../../common/super-admin.guard';
import * as dto from './dto/logistics-provider.dto';
import { LogisticsProviderService } from './logistics-provider.service';

type AuthedRequest = { user: { id: string } };

@ApiTags('Logistics Provider')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), LogisticsProviderGuard)
@Controller('logistics-provider')
export class LogisticsProviderController {
  constructor(private svc: LogisticsProviderService) {}
  @Get('overview') overview(@Req() r: AuthedRequest) { return this.svc.overview(r.user.id); }
  @Get('profile') profile(@Req() r: AuthedRequest) { return this.svc.getProfile(r.user.id); }
  @Post('profile') upsertProfile(@Req() r: AuthedRequest, @Body() d: dto.UpsertProviderProfileDto) { return this.svc.upsertProfile(r.user.id, d); }
  @Patch('profile') updateProfile(@Req() r: AuthedRequest, @Body() d: dto.UpsertProviderProfileDto) { return this.svc.upsertProfile(r.user.id, d); }
  @Post('profile/documents') addDocument(@Req() r: AuthedRequest, @Body() d: dto.AddDocumentDto) { return this.svc.addDocument(r.user.id, d); }
  @Get('zones') zones(@Req() r: AuthedRequest) { return this.svc.listZones(r.user.id); }
  @Post('zones') createZone(@Req() r: AuthedRequest, @Body() d: dto.CreateZoneDto) { return this.svc.createZone(r.user.id, d); }
  @Patch('zones/:id') updateZone(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.UpdateZoneDto) { return this.svc.updateZone(r.user.id, id, d); }
  @Delete('zones/:id') deleteZone(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.deleteZone(r.user.id, id); }
  @Get('capacity') capacity(@Req() r: AuthedRequest) { return this.svc.listCapacity(r.user.id); }
  @Post('capacity') createCapacity(@Req() r: AuthedRequest, @Body() d: dto.CreateCapacityDto) { return this.svc.createCapacity(r.user.id, d); }
  @Patch('capacity/:id') updateCapacity(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.UpdateCapacityDto) { return this.svc.updateCapacity(r.user.id, id, d); }
  @Post('capacity/:id/action') capacityAction(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.CapacityStatusDto) { return this.svc.capacityAction(r.user.id, id, d.action); }
  @Post('capacity/:id/duplicate') duplicate(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.duplicateCapacity(r.user.id, id); }
  @Get('reservations') reservations(@Req() r: AuthedRequest) { return this.svc.listProviderReservations(r.user.id); }
  @Get('reservations/:id') reservation(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.getReservation(r.user.id, id); }
  @Post('reservations/:id/action') reservationAction(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.ReservationActionDto) { return this.svc.reservationAction(r.user.id, id, d); }
  @Post('reservations/:id/mark-paid') markPaid(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.markPaid(r.user.id, id); }
  @Get('shipments') shipments(@Req() r: AuthedRequest) { return this.svc.listShipments(r.user.id); }
  @Post('shipments') createShipment(@Req() r: AuthedRequest, @Body() d: dto.CreateShipmentDto) { return this.svc.createShipment(r.user.id, d); }
  @Patch('shipments/:id') updateShipment(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.UpdateShipmentDto) { return this.svc.updateShipment(r.user.id, id, d); }
  @Get('fleet') fleet(@Req() r: AuthedRequest) { return this.svc.listFleet(r.user.id); }
  @Post('fleet/riders') createRider(@Req() r: AuthedRequest, @Body() d: dto.CreateRiderDto) { return this.svc.createRider(r.user.id, d); }
  @Patch('fleet/riders/:id') updateRider(@Req() r: AuthedRequest, @Param('id') id: string, @Body() d: dto.UpdateRiderDto) { return this.svc.updateRider(r.user.id, id, d); }
  @Post('fleet/vehicles') createVehicle(@Req() r: AuthedRequest, @Body() d: dto.CreateVehicleDto) { return this.svc.createVehicle(r.user.id, d); }
  @Delete('fleet/vehicles/:id') deleteVehicle(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.deleteVehicle(r.user.id, id); }
  @Get('earnings') earnings(@Req() r: AuthedRequest) { return this.svc.earnings(r.user.id); }
  @Post('payouts') payout(@Req() r: AuthedRequest, @Body() d: dto.RequestPayoutDto) { return this.svc.requestPayout(r.user.id, d); }
}

// Marketplace side: any authenticated business may browse provider capacity and reserve it.
// Provider identity is enforced by never accepting a providerId from the client.
@ApiTags('Logistics Provider Marketplace')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('logistics-marketplace')
export class LogisticsMarketplaceController {
  constructor(private svc: LogisticsProviderService) {}
  @Get('capacity') browse() { return this.svc.browseCapacity(); }
  @Post('reservations') reserve(@Req() r: AuthedRequest, @Body() d: dto.CreateProviderReservationDto) { return this.svc.createReservation(r.user.id, d); }
  @Get('reservations') mine(@Req() r: AuthedRequest) { return this.svc.listBusinessReservations(r.user.id); }
  @Delete('reservations/:id') cancel(@Req() r: AuthedRequest, @Param('id') id: string) { return this.svc.cancelBusinessReservation(r.user.id, id); }
}

@ApiTags('Logistics Provider Admin')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), SuperAdminGuard)
@Controller('admin/logistics-providers')
export class LogisticsProviderAdminController {
  constructor(private svc: LogisticsProviderService) {}
  @Get() providers() { return this.svc.adminProviders(); }
  @Patch(':id/verification') verification(@Param('id') id: string, @Body() d: dto.AdminVerificationDto, @Req() r: AuthedRequest) { return this.svc.adminSetVerification(r.user.id, id, d); }
  @Patch('settings/commission') commission(@Req() r: AuthedRequest, @Body() d: dto.AdminCommissionDto) { return this.svc.adminSetCommission(r.user.id, d); }
  @Patch('payouts/:id') payout(@Param('id') id: string, @Body() d: { status: 'PROCESSING' | 'PAID' | 'FAILED' | 'CANCELLED' }) { return this.svc.adminPayoutAction(id, d.status); }
}
