import { UserEntity } from "src/database/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity> {
  
}