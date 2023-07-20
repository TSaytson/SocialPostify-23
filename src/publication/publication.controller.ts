import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { PublicationService } from './publication.service';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) { }
  
  @UseGuards(AuthGuard)
  @Post()
  createPublication(@Body() body: CreatePublicationDTO) {
    return this.publicationService.createPublication(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllPublications() {
    return this.publicationService.findAllPublications();
  }
}
