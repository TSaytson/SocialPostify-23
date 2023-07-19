import { GetResult } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePublicationDTO } from "src/publication/dto/create-publication.dto";
import { PublicationRepository } from "../publication.repository";

export class PrismaPublicationRepository implements PublicationRepository{

  constructor(private readonly prisma: PrismaService) { }

  async createPublication(publication: CreatePublicationDTO){
    return await this.prisma.publication.create({
      data: publication
    })
  }
  
  async findAllPublications() {
    return await this.prisma.publication.findMany();
  }

  async findPublicationByTitle(title: string) {
    console.log('title in repository:', title);
    return await this.prisma.publication.findFirst({
      where: {title}
    })
  }
}