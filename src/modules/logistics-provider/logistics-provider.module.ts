import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { LogisticsProviderAdminController, LogisticsMarketplaceController, LogisticsProviderController } from './logistics-provider.controller';
import { LogisticsProviderService } from './logistics-provider.service';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [LogisticsProviderController, LogisticsMarketplaceController, LogisticsProviderAdminController],
  providers: [LogisticsProviderService],
  exports: [LogisticsProviderService],
})
export class LogisticsProviderModule {}
