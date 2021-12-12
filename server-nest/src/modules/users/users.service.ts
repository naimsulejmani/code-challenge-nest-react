import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserEntityRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UserActivityEntityRepository } from './user-activity.repository';
import { UserActivity } from 'src/database/entities/user-actitivty.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntityRepository)
    private readonly userRepository: UserEntityRepository,
    @InjectRepository(UserActivityEntityRepository)
    private readonly userActivityRepository: UserActivityEntityRepository,
  ) {}

  async createUser(item: UserEntity): Promise<UserEntity> {
    const user = this.userRepository.create();
    user.birthDate = item.birthDate;
    user.email = item.email;
    user.name = item.name;
    user.surname = item.surname;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(item.password, user.salt);
    const returnObject: any = await this.userRepository.insert(user);
    return returnObject.raw;
  }

  async getById(id: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail(id);
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async deleteUserById(id: string): Promise<UserEntity> {
    const user = await this.getById(id);
    if (user) {
      await this.userActivityRepository.delete({userEntity:{id:id}})
      await this.userRepository.delete({ id: id });
      return user;
    }
    throw new Error("User doesnt exists!");
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async getActivityLogin(id: string): Promise<UserActivity[]> {
    return this.userActivityRepository.find({userEntity:{id:id}})
  }
}
