import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthSignInDTO } from './dto/sign-in.dto';
import { AuthSignUpDTO } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  private ISSUER: string = 'Thiago';
  private AUDIENCE: string = 'users';

  constructor(private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService) { }
  
  async signup(body: AuthSignUpDTO) {
    const user = await this.userService.createUser(body);
    return this.generateToken(user);
  }

  async signin(body: AuthSignInDTO) {
    const user = await this.userService.findUser(body);
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const token = this.jwtService.sign({
      name: user.name,
      email: user.email
    },
      {
        expiresIn: '7 days',
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE
      });
    return token;
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
