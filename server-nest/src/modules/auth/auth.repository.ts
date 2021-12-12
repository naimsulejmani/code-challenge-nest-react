import { UserEntity } from 'src/database/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { SignInDto } from './dto/auth.dto';

import * as bcrypt from 'bcrypt';
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async validateUserPassword(
    signInDto: SignInDto,
  ): Promise<{ id: string; email: string; password: string; role: string }> {
    const { email, password } = signInDto;
    const user: UserEntity = await this.findOne({ email });
    console.log('USER FOUND => ', user);
    if (user && (await user.validatePassword(password))) {
      return {
        id: user.id,
        email: user.email,
        password: user.password,
        role: 'admin',
      };
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
