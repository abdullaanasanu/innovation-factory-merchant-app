import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';

import { Request, Response } from 'express'

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationService: NotificationsService, private prismaMongo: PrismaServiceMongo) { }

    @Post()
    async handleNotification(@Body() body, @Req() req, @Res() res: Response) {
        const token = req.headers.authorization;
        const { identifier } = body

        return await this.notificationService.handleNotification(token, identifier).then(() => {
            return res.json({
                message: "Subscription Initiated"
            })
        }).catch(err => {
            return res.status(403).json({
                message: err.message
            })
        })
    }
}
