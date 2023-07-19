import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDTO } from './dto/signIn-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) { }
  
  async createUser(user: CreateUserDTO) {
    const userFound = await this.usersRepository.findUserByEmail(user.email);
    if (userFound) throw new HttpException('User already registred', 409);
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    await this.usersRepository.createUser({ ...user, password: hashedPassword });
  }

  async signIn(user: SignInUserDTO) {
    const userFound =
      await this.usersRepository.findUserByEmail(user.email);
    if (!userFound || 
      !bcrypt.compareSync(user.password, userFound.password))
      throw new HttpException('Incorrect credentials', 401);
    delete userFound.password;
    return userFound;
  }
}
