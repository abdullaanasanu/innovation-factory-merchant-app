import { Injectable } from '@nestjs/common';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';
import { HttpService } from '@nestjs/axios';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

@Injectable()
export class SubscriptionService {
    constructor(private httpService: HttpService, private prismaMongo: PrismaServiceMongo) { }

    subscribeService(service: any, partner: any, user: any, comment: any) {
        return new Promise(async (resolve, reject) => {

            console.log("uuu ", user);


            const previousSubsciprtion = await this.prismaMongo.subscription.findFirst({
                where: {
                    serviceId: service,
                    partnerId: partner,
                    userId: user.id
                }
            })

            if (previousSubsciprtion) {
                return reject({
                    message: "Already Subscribed"
                })
            }

            this.prismaMongo.subscription.create({
                data: {
                    serviceId: service,
                    partnerId: partner,
                    comment,
                    userId: user.id
                }
            }).then(async data => {
                const partnerData = await this.prismaMongo.partner.findFirst({
                    where: {
                        id: partner
                    }
                })
                const serviceData = await this.prismaMongo.service.findFirst({
                    where: {
                        id: service
                    }
                })
                let payloadData = {
                    subscriptionId: data.id,
                    action: 'sub',
                    serviceId: serviceData.partnerServiceId,
                    sub: user.id,
                    aud: partnerData.identifier,
                    iss: "innovation-factory",
                    jti: "partner-subscription",
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 600
                }

                const token = jwt.sign(payloadData, partnerData.privateKey, { algorithm: 'RS256' });

                axios.post(partnerData.url + "subscribe", {
                    identifier: "innovation-factory"
                }, {
                    headers: {
                        Authorization: token
                    }
                }).catch(err => {
                    console.log("eee ", err.response);

                })
                resolve(data)
            }).catch(err => {
                console.log("eee ", err);

                reject(err)
            })
        })

    }

    unsubscribeService(service: any, partner: any, user: any, comment: any) {
        return new Promise(async (resolve, reject) => {

            console.log("uuu ", user);


            const previousSubsciprtion = await this.prismaMongo.subscription.findFirst({
                where: {
                    serviceId: service,
                    partnerId: partner,
                    userId: user.id
                }
            })

            if (!previousSubsciprtion) {
                return reject({
                    message: "Not Subscribed"
                })
            }

            this.prismaMongo.subscription.delete({
                where: {
                    id: previousSubsciprtion.id
                }
            }).then(async data => {
                const partnerData = await this.prismaMongo.partner.findFirst({
                    where: {
                        id: partner
                    }
                })
                const serviceData = await this.prismaMongo.service.findFirst({
                    where: {
                        id: service
                    }
                })
                let payloadData = {
                    subscriptionId: data.id,
                    action: 'unsub',
                    serviceId: serviceData.partnerServiceId,
                    sub: user.id,
                    aud: partnerData.identifier,
                    iss: "innovation-factory",
                    jti: "partner-subscription",
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 600
                }

                const token = jwt.sign(payloadData, partnerData.privateKey, { algorithm: 'RS256' });
                
                axios.post(partnerData.url + "subscribe", {
                    identifier: "innovation-factory"
                }, {
                    headers: {
                        Authorization: token
                    }
                }).catch(err => {
                    console.log("eee ", err.response);

                })
                resolve(data)
            }).catch(err => {
                console.log("eee ", err);

                reject(err)
            })
        })

    }
}
