import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserService } from './modules/user/user.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { ShipbubbleModule } from './modules/shipbubble/shipbubble.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { InstagramModule } from './modules/instagram/instagram.module';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { AutomationModule } from './modules/automation/automation.module';
import { PaymentModule } from './modules/payment/payment.module';
import { NotificationModule } from './modules/notification/notifcation.module';
import { CreditModule } from './modules/credits/credit.module';
import { AiDeliveryModule } from './modules/ai-delivery/ai-delivery.module';
import { AdminModule } from './modules/admin/admin.module';
import { SharedNetworkModule } from './modules/shared-network/shared-network.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    ShipbubbleModule,
    WebhookModule,
    WhatsappModule,
    InstagramModule,
    TerminusModule,
    DeliveryModule,
    AutomationModule,
    NotificationModule,
    PaymentModule,
    CreditModule,
    AiDeliveryModule,
    AdminModule,
    SharedNetworkModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    UserService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
