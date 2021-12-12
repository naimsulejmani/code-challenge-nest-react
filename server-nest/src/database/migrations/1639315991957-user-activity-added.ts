import {MigrationInterface, QueryRunner} from "typeorm";

export class userActivityAdded1639315991957 implements MigrationInterface {
    name = 'userActivityAdded1639315991957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user-activity" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_7b25d839dc1c365992a09c46186" DEFAULT NEWSEQUENTIALID(), "loginDate" datetime NOT NULL, "isSucceeded" bit NOT NULL, "userEntityId" uniqueidentifier, CONSTRAINT "PK_7b25d839dc1c365992a09c46186" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user-activity" ADD CONSTRAINT "FK_fdc4158d2bd42f5b302ae501b12" FOREIGN KEY ("userEntityId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-activity" DROP CONSTRAINT "FK_fdc4158d2bd42f5b302ae501b12"`);
        await queryRunner.query(`DROP TABLE "user-activity"`);
    }

}
