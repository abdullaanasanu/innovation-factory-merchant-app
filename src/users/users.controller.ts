import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDTO } from 'src/dto/UserRegister';
import { PrismaServiceMySQL } from '../prisma-mysql.service';
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private prismaMySQL: PrismaServiceMySQL) { }

    @Post("sign-up")
    async signUp(@Body() body: UserRegisterDTO, @Res() res: Response) {
        // console.log(body);
        const { email } = body
        const user = await this.prismaMySQL.user.findUnique({
            where: {
                email
            }
        })
        if (user) {
            return res.status(401).json({
                message: "User Already Exist!"
            })
        }
        return this.usersService.createUser(body).then(() => {
            return res.json({
                message: "Account Created"
            })
        }).catch(err => {
            return res.status(403).json(err.message);
        })

    }

    @Post("login")
    async login(@Body() body: UserRegisterDTO, @Res() res: Response) {
        // console.log(body);
        const { email, password } = body
        const user = await this.prismaMySQL.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            return res.status(401).json({
                message: "User Already Exist!"
            })
        }
        
        return this.usersService.userLogin(user, password).then((data) => {
            return res.json(data)
        }).catch(err => {
            return res.status(403).json(err.message);
        })

    }

    @Get("")
    getUser(@Req() req: Request, @Res() res: Response){
        
        const token = req.headers.authorization.split(" ")[1]
        return this.usersService.verifyUser(token).then(data => {
            return res.json({user: data});
        }).catch(err => {
            return res.status(401).json({
                message: "Invalid Token"
            })
        })


    }

}
