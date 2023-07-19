import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './repository/publication.repository';
import { PrismaPublicationRepository } from './repository/implementations/prismaPublication.repository';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, {
    provide: PublicationRepository,
    useClass: PrismaPublicationRepository
  }]
})
export class PublicationModule {}
