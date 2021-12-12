import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { UserActivity } from './user-actitivty.entity';

@Entity({ name: 'user' })
@Unique(['email'])
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  birthDate: Date;

  @Column()
  salt: string;

  @OneToMany(
    (activity) => UserActivity,
    (userActivity)=> userActivity.userEntity
  )
  userActivity: UserActivity[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
