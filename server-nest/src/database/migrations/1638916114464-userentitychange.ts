import {MigrationInterface, QueryRunner} from "typeorm";

export class userentitychange1638916114464 implements MigrationInterface {
    name = 'userentitychange1638916114464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "code-challenge.dbo.user.username", "email"`);
        await queryRunner.query(`EXEC sp_rename "code-challenge.dbo.user.UQ_78a916df40e02a9deb1c4b75edb", "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`EXEC sp_rename "code-challenge.dbo.user.UQ_e12875dfb3b1d92d7d7c5377e22", "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`EXEC sp_rename "code-challenge.dbo.user.email", "username"`);
    }

}
