import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PrismaServiceMongo } from '../prisma-mongo.service';
import { PartnerService } from './partner.service';

import { Request, Response } from 'express'
import slugify from 'slugify'
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('partner')
@UseGuards(AuthGuard)
export class PartnerController {
    constructor(private readonly partnerService: PartnerService, private prismaMongo: PrismaServiceMongo) { }

    @Get()
    async getAllPartner(@Req() req, @Res() res: Response) {
        console.log(req.user);
        
        const partners = await this.partnerService.getPartners()
        return res.json({
            partners
        })
    }

    @Post("create")
    async createProvider(@Body() body, @Req() req: Request, @Res() res: Response) {
        await this.partnerService.createPartner(body).then(() => {
            return res.json({
                message: "Partner created"
            })
        }).catch(err => {
            return res.status(403).json({
                message: err.message
            })
        })
    }


}
