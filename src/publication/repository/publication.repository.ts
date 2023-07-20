import { Publication } from "@prisma/client";
import { CreatePublicationDTO } from "../dto/create-publication.dto";

export abstract class PublicationRepository{
  abstract createPublication(publication: CreatePublicationDTO): Promise<Publication>;
  abstract findAllPublications(userId:number): Promise<Publication[]>;
  abstract findPublicationByTitle(title: string): Promise<Publication>;
}