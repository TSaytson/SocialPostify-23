import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService) { }
  
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token)
      throw new UnauthorizedException('Unauthorized');

    try {
      const data = this.authService.checkToken(token);

      const user =
        await this.userService.findUserById(Number(data.sub));
      
      req.user = user;
      
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}