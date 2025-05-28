import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnActiveInUser1748440443457 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "active" boolean NOT NULL DEFAULT true;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            DROP COLUMN "active";
        `);
    }

}
