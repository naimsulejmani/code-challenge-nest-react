import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from './user.entity';



@Entity({ name: 'user-activity' })
export class UserActivity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  loginDate: Date;

  @Column()
  isSucceeded: boolean;

    @ManyToOne(
        (userEntity) => UserEntity,
        (userEntity)=>userEntity.userActivity
  )
  userEntity: UserEntity;

}
