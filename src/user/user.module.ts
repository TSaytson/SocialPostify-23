import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { PrismaUserRepository } from './repository/implementations/prismaUser.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, {
    provide: UserRepository,
    useClass: PrismaUserRepository
  }]
})
export class UserModule {}
