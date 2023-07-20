import { Injectable } from "@nestjs/common";
import { Publication } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { PublicationRepository } from "../publication.repository";

@Injectable()
export class PrismaPublicationRepository implements PublicationRepository{

  constructor(private readonly prisma: PrismaService) { }

  async createPublication(publication: Publication){
    return await this.prisma.publication.create({
      data: publication
    })
  }

  async findAllPublications(userId:number) {
    return await this.prisma.publication.findMany({
      where: {userId}
    });
  }

  async findPublicationByTitle(title: string) {
    return this.prisma.publication.findFirst({
      where: {title}
    })
  }
}