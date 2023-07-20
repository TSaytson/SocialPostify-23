import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { SignInUserDTO } from './dto/signIn-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @Post('register')
  addUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }
}
