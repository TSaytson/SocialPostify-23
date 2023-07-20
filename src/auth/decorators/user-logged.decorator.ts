import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const UserLogged = createParamDecorator((data: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  if (!req.user) throw new NotFoundException('User not found');
  return req.user;
})