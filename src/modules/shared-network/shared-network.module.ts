import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { PaymentModule } from '../payment/payment.module';
import { CreditModule } from '../credits/credit.module';
import { SharedNetworkAdminController, SharedNetworkController, SharedNetworkPublicController } from './shared-network.controller';
import { SharedNetworkService } from './shared-network.service';
@Module({ imports: [ConfigModule, PrismaModule, PaymentModule, CreditModule], controllers: [SharedNetworkPublicController, SharedNetworkController, SharedNetworkAdminController], providers: [SharedNetworkService], exports: [SharedNetworkService] })
export class SharedNetworkModule {}
