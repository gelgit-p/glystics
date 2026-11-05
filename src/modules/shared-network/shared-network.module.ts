import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { PaymentModule } from '../payment/payment.module';
import { SharedNetworkAdminController, SharedNetworkController } from './shared-network.controller';
import { SharedNetworkService } from './shared-network.service';
@Module({ imports: [ConfigModule, PrismaModule, PaymentModule], controllers: [SharedNetworkController, SharedNetworkAdminController], providers: [SharedNetworkService], exports: [SharedNetworkService] })
export class SharedNetworkModule {}
