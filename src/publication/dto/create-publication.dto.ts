import { Transform, TransformFnParams } from "class-transformer";
import { IsBoolean, IsDate, IsISO8601, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePublicationDTO{
  
  @IsString()
  @IsUrl()
  image: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  title: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  text: string;

  @IsISO8601()
  @IsNotEmpty()
  dateToPublish: Date;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  socialMedia: string;
}