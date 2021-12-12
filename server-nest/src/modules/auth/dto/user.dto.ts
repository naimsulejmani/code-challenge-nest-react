import {
  IsBoolean,
  IsDate,
  isEmail,
  IsEmail,
  IsNegative,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { SignInDto } from './auth.dto';

export class UserDto extends SignInDto {

  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  surname: string;

  birthdate: Date;
}
