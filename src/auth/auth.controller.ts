import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDTO } from './dto/sign-in.dto';
import { AuthSignUpDTO } from './dto/sign-up.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('user')
  async signup(@Body() body:AuthSignUpDTO ) {
    return this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body:AuthSignInDTO) {
    return this.authService.signin(body);
  }
}
