import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { SignInUserDTO } from './dto/signIn-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @Post('user')
  addUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Post('signin')
  @HttpCode(200)
  signIn(@Body() body: SignInUserDTO) {
    this.userService.signIn(body);
    return {
      message: `Successful login`
    }
  }
}
