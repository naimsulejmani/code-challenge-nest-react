import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
//import { UserEntity } from 'src/database/entities/user.entity';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { EmailDto } from './dto/email.dto';
@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private authService: AuthService) {}

  @Post('/signin')
  login(@Body() authModel: SignInDto): Promise<{ accessToken: string }> {
    console.log(authModel);

    return this.authService.login(authModel);
  }

  @Post('/signup')
  register(@Body() authModel: UserDto): Promise<UserEntity> {
    console.log('REGISTRATION STARTED = ', authModel);

    return this.authService.register(authModel);
  }

  @Post('/recovery')
  recoveryEmail(@Body() emailDto: EmailDto): Promise<any> {
    return this.authService.recoveryPassword(emailDto.email);
  }

  @Get('/users')
  @UseGuards(AuthGuard())
  getUsers(@Req() req): string {
    console.log(req.user);
    return 'abel fit users!!!';
  }
}
