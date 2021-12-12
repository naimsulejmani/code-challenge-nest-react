import {MigrationInterface, QueryRunner} from "typeorm";

export class userentitychange11638917457225 implements MigrationInterface {
    name = 'userentitychange11638917457225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "surname" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "birthDate" datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

}
