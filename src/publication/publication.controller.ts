import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { PublicationService } from './publication.service';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) { }
  
  @Post()
  createPublication(@Body() body: CreatePublicationDTO) {
    return this.publicationService.createPublication(body);
  }

  @Get()
  findAllPublications() {
    return this.publicationService.findAllPublications();
  }
}
