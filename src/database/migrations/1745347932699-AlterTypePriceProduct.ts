import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTypePriceProduct1745347932699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product"
      ALTER COLUMN "price" TYPE real
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product"
      ALTER COLUMN "price" TYPE numeric
    `);
  }
}
