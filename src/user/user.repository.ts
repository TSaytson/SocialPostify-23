import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";


@Injectable()
export class UserRepository{
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