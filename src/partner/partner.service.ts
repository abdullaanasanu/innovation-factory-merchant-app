import { Injectable } from '@nestjs/common';
import slugify from 'slugify'
import { PrismaServiceMongo } from 'src/prisma-mongo.service';

@Injectable()
export class PartnerService {
    constructor(private prismaMongo: PrismaServiceMongo) { }

    createPartner(partnerData: any) {
        return new Promise((resolve, reject) => {
            const { name, description, image, publicKey, privateKey, url, identifier } = partnerData
            const slug = slugify(name);
            this.prismaMongo.partner.create({
                data: {
                    slug,
                    name,
                    description,
                    image,
                    publicKey,
                    privateKey,
                    url,
                    identifier
                }
            }).then(data => {
                resolve(data)
            }).catch(err => {
                console.log("eee ", err);
                
                reject(err)
            })
        })
        
    }

    async getPartners() {
        return await this.prismaMongo.partner.findMany();
    }
}
