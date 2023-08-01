import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs'
import * as path from 'path';
import { PrismaServiceMySQL } from 'src/prisma-mysql.service';

const options = {
    private: fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys', 'private.pem')),
    public: fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys', 'public.pem'))
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private prismaMySQL: PrismaServiceMySQL) { }
    

    async use(req: Request, res: Response, next: NextFunction) {
        // Extract the token from the request headers or cookies or wherever you are sending it
        const token = req.headers.authorization?.replace('Bearer ', '');
        // If using cookies, you can access it like this: const token = req.cookies['access_token'];

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, options.public, { algorithms: ['RS256'] })
            const user = await this.prismaMySQL.user.findUnique({
                where: {
                    id: decoded.userId
                },
                select:{
                    email: true,
                    name: true
                }
            })
            // Attach the decoded user object to the request for future use in controllers
            req['user'] = decoded;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }

        next();
    }
}
