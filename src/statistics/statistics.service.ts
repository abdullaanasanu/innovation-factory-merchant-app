import { Injectable } from '@nestjs/common';
import { PrismaServiceMongo } from 'src/prisma-mongo.service';

@Injectable()
export class StatisticsService {
    constructor(private prismaMongo: PrismaServiceMongo) { }

    async getStatistics () {
        let services = await this.prismaMongo.service.findMany()
        services = await Promise.all(
            services.map(async (service: any) => {
                service.completedSubscription = await this.prismaMongo.subscription.aggregate({
                    where: {
                        status: "COMPLETED"
                    },
                    _count: {
                        userId: true
                    }
                })
                service.completedSubscription = service.completedSubscription._count.userId
                service.pendingSubscription = await this.prismaMongo.subscription.aggregate({
                    where: {
                        status: "PENDING"
                    },
                    _count: {
                        userId: true
                    }
                })
                service.pendingSubscription = service.pendingSubscription._count.userId
                return service;
            })
        )
        return services;
    }
}
