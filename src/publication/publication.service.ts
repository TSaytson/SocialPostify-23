import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { PublicationRepository } from './repository/publication.repository';

@Injectable()
export class PublicationService {

  constructor(private readonly publicationRepository: PublicationRepository) { }

  async createPublication(body: CreatePublicationDTO, userId:number) {
    const publicationFound =
      await this.publicationRepository.findPublicationByTitle(body.title);
    
    if (publicationFound) throw new ConflictException('Publication already exists');

    const formatedDate = new Date(body.dateToPublish);
    
    const publication = { ...body, dateToPublish: formatedDate, userId };
    
    return this.publicationRepository.createPublication(publication);
  }

  async findAllPublications(userId:number) {
    return this.publicationRepository.findAllPublications(userId);
  }
}
