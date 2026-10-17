import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserService } from './modules/user/user.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => {
        return { req, res };
      },
    }),
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
