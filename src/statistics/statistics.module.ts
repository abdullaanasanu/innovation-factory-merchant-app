import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, PrismaServiceMongo]
})
export class StatisticsModule {}
