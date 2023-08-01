import { Injectable } from '@nestjs/common';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';
import axios from 'axios'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class NotificationsService {
    constructor(private prismaMongo: PrismaServiceMongo) { }

    handleNotification(token: any, identifier: string) {
        return new Promise(async (resolve, reject) => {
            const partner = await this.prismaMongo.partner.findFirst({
                where: {
                    identifier
                }
            })
            // console.log("mmm ", merchant);

            const decoded = jwt.verify(token, partner.publicKey, { algorithms: ['RS256'] })
            console.log("ddd ", decoded);

            const subsciprtion = await this.prismaMongo.subscription.findFirst({
                where: {
                    id: decoded.subscriptionId
                }
            })

            if (decoded.action == "sub") {
                await this.prismaMongo.subscription.update({
                    where: {
                        id: subsciprtion.id
                    },
                    data: {
                        status: "COMPLETED"
                    }
                })

                await this.prismaMongo.notification.create({
                    data: {
                        title: "Subscription is completed",
                        content: JSON.stringify(decoded),
                        serviceId: subsciprtion.serviceId,
                        userId: subsciprtion.userId,
                        partnerId: subsciprtion.partnerId
                    }
                })

            } else if (decoded.action == "unsub") {


                await this.prismaMongo.notification.create({
                    data: {
                        title: "Unsubscription is completed",
                        content: JSON.stringify(decoded),
                        userId: decoded.sub,
                        partnerId: partner.id
                    }
                })
            }


        })

    }
}
