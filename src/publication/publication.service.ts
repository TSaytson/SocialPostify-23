import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { PublicationRepository } from './repository/publication.repository';

@Injectable()
export class PublicationService {

  constructor(private readonly publicationRepository: PublicationRepository) { }

  async createPublication(publication: CreatePublicationDTO) {
    const publicationFound =
      await this.publicationRepository.findPublicationByTitle(publication.title);
    
    if (publicationFound) throw new ConflictException('Publication already exists');

    const formatedDate = new Date(publication.dateToPublish);

    return this.publicationRepository.createPublication({...publication, dateToPublish:formatedDate});
  }

  async findAllPublications() {
    return this.publicationRepository.findAllPublications();
  }
}
