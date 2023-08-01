import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaServiceMySQL } from 'src/prisma-mysql.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaServiceMySQL]
})
export class UsersModule {}
