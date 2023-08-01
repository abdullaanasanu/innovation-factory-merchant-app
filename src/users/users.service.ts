import { Injectable } from '@nestjs/common';
import { UserRegisterDTO } from 'src/dto/UserRegister';
import { PrismaServiceMySQL } from 'src/prisma-mysql.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs'
import * as path from 'path';

const options = {
    private: "-----BEGIN RSA PRIVATE KEY-----\n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\n-----END RSA PRIVATE KEY-----",
    // fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys', 'private.pem')),
    public: "-----BEGIN PUBLIC KEY-----\nMIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBnlEFkPF5aYpnopJFvWvDG\nWVrcmq9lQOXmWlt00scp/9wpzu5Wah1pFkNaeCkn2JMzbLdO2GNpV4bNAS9WEoYP\nz+Sd5eXOlrDM5q2tGw74R6xgRrdPkiyLg/MG115a1ZjhdrBGDTI34eQny6f+tymq\nbBmhYVL7k+PdN4QZwxB4XgkgBlZZGGoL4xX6IFf/OWeu8UOHOVg1aCumUmIQ895Z\n2ximOCquP7VwCA/kuAx8D2rwtE/NNCJRYlFuuv0VNvmp3VHN9e0DWSVU0XruddBd\nInSAwtwXcVKiCVi5gO+wfbNRUO9a6kQPO8Oe7n1ai01OOdVBupIPu/Df01a8T2MA\nvMmOpHni8NQsuuY9SY4O32LAuExXYe20pl8lZkdzqDpfSWs4Gh7F8dYPyQpC2asj\niAbpvXk7jYdONgub1bpou9wfQoYcER165eYJpvUNPYPMkT9B83oawKA0B9RwwyMO\ncg5pbwTSASXSA1KEZ+SQp8f4OSHjUHeuYql8qH7BPCGEuY163Xi11lQ6OHXgTvV6\neEebeX2C2/b8xGnKR/o9ocNKkqECJbc/6lF8VZrgK0YainWTztUN6LNvGA6SOJSd\nMljFFX7UcO5v33t6rWp1ujmAQLRIxRzcTU8BJlC0PujuEey9leMxB/iEO6AhqkYW\nEWUFnxh5mXSVMsvijyeORQIDAQAB\n-----END PUBLIC KEY-----",
    // fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys', 'public.pem'))
};


const saltOrRounds = 10;

@Injectable()
export class UsersService {
    constructor(private prismaMySQL: PrismaServiceMySQL) { }

    async createUser(user: UserRegisterDTO) {
        return new Promise(async (resolve, reject) => {
            try {
                const hash = await bcrypt.hash(user.password, saltOrRounds);
                await this.prismaMySQL.user.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        hashedPassword: hash
                    }
                })
                resolve({})
            } catch (error) {
                console.log("Error", error);
                reject(error)
            }
        })
        
    }

    async userLogin(user: any, password: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const isMatch = await bcrypt.compare(password, user.hashedPassword);
                // var privateKey = fs.readFileSync(__dirname+'/src/keys/private.pem');
                if(isMatch) {
                    const token = jwt.sign({
                        userId: user.id,
                        email: user.email,
                        exp: Math.floor(Date.now() / 1000) + 3600 * 24
                    }, options.private, { algorithm: 'RS256' });
                    resolve({
                        token,
                        user: {
                            email: user.email,
                            name: user.name
                        },
                        message: "User Logged In!"
                    })
                }else{
                    reject({
                        message: "Incorrect Password",
                        code: 401
                    })
                }
                resolve
            } catch (error) {
                console.log("Error", error);
                reject(error)
            }
        })
        
    }

    async verifyUser(token: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const decoded = jwt.verify(token, options.public, { algorithms: ['RS256'] });
                // var privateKey = fs.readFileSync(__dirname+'/src/keys/private.pem');
                const user = await this.prismaMySQL.user.findUnique({
                    where: {
                        id: decoded.userId
                    },
                    select:{
                        email: true,
                        name: true
                    }
                })
                resolve(user)
            } catch (error) {
                console.log("Error", error);
                reject(error)
            }
        })
        
    }
}
