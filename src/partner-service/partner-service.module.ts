import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PartnerServiceController } from './partner-service.controller';
import { PartnerServiceService } from './partner-service.service';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';
import { PrismaServiceMySQL } from 'src/prisma-mysql.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  controllers: [PartnerServiceController],
  providers: [PartnerServiceService, PrismaServiceMongo, PrismaServiceMySQL]
})

export class PartnerServiceModule {

}