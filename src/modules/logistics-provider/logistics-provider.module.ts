import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { AdminNotificationsGateway } from './admin-notifications.gateway';
import { LogisticsProviderAdminController, LogisticsMarketplaceController, LogisticsProviderController } from './logistics-provider.controller';
import { LogisticsProviderService } from './logistics-provider.service';

@Module({
  imports: [ConfigModule, PrismaModule, JwtModule.register({})],
  controllers: [LogisticsProviderController, LogisticsMarketplaceController, LogisticsProviderAdminController],
  providers: [LogisticsProviderService, AdminNotificationsGateway],
  exports: [LogisticsProviderService, AdminNotificationsGateway],
})
export class LogisticsProviderModule {}
