import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfigFactory, TYPEORM_CONFIG } from './typeorm.config';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(typeOrmConfigFactory)],
      useFactory: (config: TypeOrmModuleOptions) => {
        return config;
      },
      inject: [TYPEORM_CONFIG],
    }),
    AuthModule, UsersModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
