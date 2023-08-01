import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';
import { SubscriptionService } from './subscription.service';

import {Request, Response} from 'express'
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('subscription')
@UseGuards(AuthGuard)
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService, private prismaMongo: PrismaServiceMongo) { }

    @Post("subscribe")
    async subscribe(@Body() body, @Req() req, @Res() res: Response) {
        const {service, partner, comment} = body
        const {user} = req;
        return await this.subscriptionService.subscribeService(service, partner, user, comment).then(() => {
            return res.json({
                message: "Subscription Initiated"
            })
        }).catch(err => {
            return res.status(403).json({
                message: err.message
            })
        })
    }

    @Post("unsubscribe")
    async unsubscribe(@Body() body, @Req() req, @Res() res: Response) {
        const {service, partner, comment} = body
        const {user} = req;
        return await this.subscriptionService.unsubscribeService(service, partner, user, comment).then(() => {
            return res.json({
                message: "Subscription Unsubscribed"
            })
        }).catch(err => {
            return res.status(403).json({
                message: err.message
            })
        })
    }
}
