import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';
import { PrismaServiceMySQL } from 'src/prisma-mysql.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, PrismaServiceMongo, PrismaServiceMySQL]
})
export class SubscriptionModule {

}