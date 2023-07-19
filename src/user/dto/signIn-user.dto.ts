import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SignInUserDTO {

  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6
  })
  password: string;
}