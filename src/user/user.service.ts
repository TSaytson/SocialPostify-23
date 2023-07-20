import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    return await this.usersRepository.createUser({ ...user, password: hashedPassword });
  }

  async findUser(user: SignInUserDTO) {
    const userFound =
      await this.usersRepository.findUserByEmail(user.email);
    if (!userFound || 
      !bcrypt.compareSync(user.password, userFound.password))
      throw new UnauthorizedException('Incorrect credentials');
    delete userFound.password;
    return userFound;
  }

  async findUserById(id: number) {
    const user =
      await this.usersRepository.findUserById(id);
    if (!user)
      throw new NotFoundException('User not found');

    return user;
  }
}
