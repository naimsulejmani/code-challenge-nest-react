import { UserActivity } from 'src/database/entities/user-actitivty.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserActivity)
export class UserActivityEntityRepository extends Repository<UserActivity> {}
