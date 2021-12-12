import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
