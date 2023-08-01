import { Controller, Get, Req, Res, Post, Body, UseGuards } from '@nestjs/common';
import { PartnerService } from 'src/partner/partner.service';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';
import { PartnerServiceService } from './partner-service.service';

import {Request, Response} from 'express'
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('partner-service')
@UseGuards(AuthGuard)
export class PartnerServiceController {
    constructor(private readonly partnerService: PartnerServiceService, private prismaMongo: PrismaServiceMongo) { }

    @Get()
    async getAllService(@Req() req, @Res() res: Response) {
        const services = await this.partnerService.getServices(req.user)
        return res.json({
            services
        })
    }

    @Post("create")
    async createService(@Body() body, @Req() req: Request, @Res() res: Response) {
        return await this.partnerService.createService(body).then(() => {
            return res.json({
                message: "Service created"
            })
        }).catch(err => {
            return res.status(403).json({
                message: err.message
            })
        })
    }
}
