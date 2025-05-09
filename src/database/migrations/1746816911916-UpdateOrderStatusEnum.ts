import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderStatusEnum1746816911916 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT;
            DROP TYPE IF EXISTS "order_status_enum_old";
            ALTER TYPE "order_status_enum" RENAME TO "order_status_enum_old";
        `);
    
        await queryRunner.query(`
            CREATE TYPE "order_status_enum" AS ENUM('CANCELADO', 'ANDAMENTO', 'FINALIZADO');
        `);
    
        await queryRunner.query(`
            ALTER TABLE "order"
            ALTER COLUMN "status" TYPE "order_status_enum" USING "status"::text::"order_status_enum",
            ALTER COLUMN "status" SET DEFAULT 'ANDAMENTO';
        `);
    
        await queryRunner.query(`
            DROP TYPE "order_status_enum_old";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT;
            CREATE TYPE "order_status_enum_old" AS ENUM('PENDENTE', 'EM_ANDAMENTO', 'FINALIZADO');
        `);
    
        await queryRunner.query(`
            ALTER TABLE "order"
            ALTER COLUMN "status" TYPE "order_status_enum_old" USING "status"::text::"order_status_enum_old",
            ALTER COLUMN "status" SET DEFAULT 'PENDENTE';
        `);
    
        await queryRunner.query(`
            DROP TYPE "order_status_enum";
            ALTER TYPE "order_status_enum_old" RENAME TO "order_status_enum";
        `);
    }

}
