import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaUserRepository } from 'src/user/repository/implementations/prismaUser.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  controllers: [AuthController],
  providers: [AuthService, UserService, {
    provide: UserRepository,
    useClass: PrismaUserRepository
  }]
})
export class AuthModule {}
