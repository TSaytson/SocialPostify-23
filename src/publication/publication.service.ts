import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { PublicationRepository } from './repository/publication.repository';

@Injectable()
export class PublicationService {

  constructor(private readonly publicationRepository: PublicationRepository) { }

  async createPublication(publication: CreatePublicationDTO) {
    const publicationFound =
      await this.publicationRepository.findPublicationByTitle(publication.title);
    console.log(publication);
    if (publicationFound) throw new ConflictException('Publication already exists');
    console.log(publication);
    return this.publicationRepository.createPublication(publication);
  }

  async findAllPublications() {
    return this.publicationRepository.findAllPublications();
  }
}
