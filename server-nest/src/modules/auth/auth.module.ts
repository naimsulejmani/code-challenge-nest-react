import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './auth.repository';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserActivityEntityRepository } from '../users/user-activity.repository';
import { EmailService } from 'src/common/services/email.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'jshdfkjsk%$',
      signOptions: {
        expiresIn: 36000,
      },
    }),
    TypeOrmModule.forFeature([UserRepository, UserActivityEntityRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EmailService],
  exports: [TypeOrmModule, JwtStrategy, EmailService],
})
export class AuthModule {}
