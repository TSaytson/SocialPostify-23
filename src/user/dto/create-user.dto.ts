import { IsEmail, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class CreateUserDTO{

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6
  })
  password: string;

  @IsString()
  @IsUrl()
  avatar: string;
}