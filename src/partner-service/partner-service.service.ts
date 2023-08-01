import { Injectable } from '@nestjs/common';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';

@Injectable()
export class PartnerServiceService {
    constructor(private prismaMongo: PrismaServiceMongo) { }

    createService(serviceData: any) {
        return new Promise((resolve, reject) => {
            const { name, description, image, partner, partnerServiceId } = serviceData
            this.prismaMongo.service.create({
                data: {
                    name,
                    description,
                    image,
                    partnerId: partner,
                    partnerServiceId 
                }
            }).then(data => {
                resolve(data)
            }).catch(err => {
                console.log("eee ", err);
                
                reject(err)
            })
        })
        
    }

    async getServices(user: any) {
        let services = await this.prismaMongo.service.findMany();
        services = await Promise.all(
            services.map(async (service : any) => {
                service.partner = await this.prismaMongo.partner.findFirst({
                    where: {
                        id: service.partnerId
                    },
                    select: {
                        name: true,
                        description: true,
                        image: true
                    }
                })
                service.isSubscribed = await this.prismaMongo.subscription.findFirst({
                    where: {
                        serviceId: service.id,
                        partnerId: service.partnerId,
                        userId: user.id
                    }
                }) != null
                return service;
            })
        )
        
        return services;
    }
}
