import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { PrismaServiceMySQL } from 'src/prisma-mysql.service';

@Module({
  controllers: [PartnerController],
  providers: [PartnerService, PrismaServiceMongo, PrismaServiceMySQL]
})
export class PartnerModule {

}