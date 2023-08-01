import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaServiceMongo]
})
export class NotificationsModule { }
