import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PartnerModule } from './partner/partner.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PartnerServiceModule } from './partner-service/partner-service.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PrismaServiceMySQL } from './prisma-mysql.service';
import { NotificationsModule } from './notifications/notifications.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [UsersModule, PartnerModule, SubscriptionModule, PartnerServiceModule, NotificationsModule, StatisticsModule],
  controllers: [AppController],
  providers: [AppService, PrismaServiceMySQL],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware)
//     .exclude({path: 'api/users/login', method: RequestMethod.POST}, {path: 'api/users/sign-up', method: RequestMethod.POST})
//     .forRoutes("/partner");
//     // You can replace '*' with the specific route(s) you want to protect with the middleware.
//   }
// }