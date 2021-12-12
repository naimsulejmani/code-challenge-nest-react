import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
//import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './auth.repository';
import { SignInDto } from './dto/auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { UserActivityEntityRepository } from '../users/user-activity.repository';
import { EmailService } from 'src/common/services/email.service';
import { EmailType } from 'src/common/services/EmailType';
//import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(UserActivityEntityRepository)
    private readonly userActivityRepository: UserActivityEntityRepository,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async create(userEntity: UserEntity): Promise<UserEntity> {
    return await userEntity.save();
  }

  async recoveryPassword(email) {
    let passNo = "00000000" + Number(Math.random() * 1_000_000_000).toFixed(0).toString();
    passNo = passNo.substring(passNo.length - 8, passNo.length);

    const user = await this.userRepository.findOne({ email: email });
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(passNo, user.salt);
    await this.userRepository.save(user);

    this.emailService.sendEmail("", user.email, "Password Changed", passNo, EmailType.PASSWORD_RECOVERY);
    return "SUCCESS";
  }

  async register(item: UserDto): Promise<UserEntity> {
    const oldUser: UserEntity = await this.userRepository.findOne({
      email: item.email,
    });

    if (oldUser) {
      throw new Error('Email is already registered to the user');
    } else {
      const user = this.userRepository.create();
      user.birthDate = item.birthdate;
      user.email = item.email;
      user.name = item.name;
      user.surname = item.surname;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(item.password, user.salt);
      const returnObject: any = await this.userRepository.insert(user);
      console.log("REGISTERED ID = ", returnObject.raw);
      this.emailService.sendEmail("", user.email, "Confirm Registration", returnObject.raw[0].id, EmailType.REGISTRATION);
      return returnObject.raw;
    }
  }

  async login(authDto: SignInDto): Promise<{ accessToken: string }> {
    // console.log('LOGIN DTO ' + authDto);
    // const userEntity = await this.userRepository.findOne({
    //   username: authDto.username,
    //   password: authDto.password,
    // });

    // return userEntity;
    console.log(authDto);
    const user = await this.userRepository.validateUserPassword(authDto);

    console.log('USER = ', user);


    if (!user) {

      throw new UnauthorizedException('Invalid Credentials');
    }
    const ua = this.userActivityRepository.create();
    ua.loginDate = new Date();
    ua.userEntity = this.userRepository.create();
    ua.userEntity.email = user.email;
    ua.userEntity.id = user.id;
    ua.isSucceeded = true;

    await this.userActivityRepository.insert(ua);

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      roles: user.role,
    };

    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Successfully Generated JWT Token with payload ${JSON.stringify(
        payload,
      )}`,
    );

    return { accessToken };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
