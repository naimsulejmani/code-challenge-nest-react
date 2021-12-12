import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailDto } from './email.dto';

export class SignInDto extends EmailDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
