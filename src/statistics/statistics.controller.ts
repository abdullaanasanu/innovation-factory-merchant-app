import { Controller, Get, Req, Res } from '@nestjs/common';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';
import { StatisticsService } from './statistics.service';
import {Request, Response} from 'express'


@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService, private prismaMongo: PrismaServiceMongo) { }

    @Get()
    async getStatistics(@Req() req: Request, @Res() res: Response) {
        const statistics = await this.statisticsService.getStatistics();
        res.json({statistics})
    }
}
