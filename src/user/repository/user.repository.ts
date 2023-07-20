import { User } from "@prisma/client";
import { CreateUserDTO } from "../dto/create-user.dto";

export abstract class UserRepository{
  abstract createUser(user: CreateUserDTO): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User>;
  abstract findUserById(id: number): Promise<User>;
}