import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "src/user/dto/create-user.dto";
import { UserRepository } from "../user.repository";


@Injectable()
export class PrismaUserRepository implements UserRepository{
  constructor(private readonly prisma: PrismaService) { }

  async createUser(user:CreateUserDTO) {
    return await this.prisma.user.create({
      data: user
    })
  }
  async findUserByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: { email }
    })
  }
}