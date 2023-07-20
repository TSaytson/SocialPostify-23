import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserLogged } from 'src/auth/decorators/user-logged.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { PublicationService } from './publication.service';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) { }
  
  @UseGuards(AuthGuard)
  @Post()
  createPublication(@Body() body: CreatePublicationDTO, @UserLogged() user: User) {
    return this.publicationService.createPublication(body, user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllPublications(@UserLogged() user: User) {
    return this.publicationService.findAllPublications(user.id);
  }
}
