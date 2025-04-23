import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableInsertCodeUnit1745376144635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("unit", new TableColumn({
            name: "code",
            type: "varchar",
            isNullable: false,
            isUnique: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("unit", "code");
    }

}
