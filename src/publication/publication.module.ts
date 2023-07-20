import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './repository/publication.repository';
import { PrismaPublicationRepository } from './repository/implementations/prismaPublication.repository';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/user/repository/user.repository';
import { PrismaUserRepository } from 'src/user/repository/implementations/prismaUser.repository';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  controllers: [PublicationController],
  providers: [PublicationService, AuthService, UserService, {
    provide: PublicationRepository,
    useClass: PrismaPublicationRepository
  }, {
    provide: UserRepository,
    useClass: PrismaUserRepository
  }]
})
export class PublicationModule {}
