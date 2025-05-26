import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnNCM1748282166950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "product",
            new TableColumn({
                name: "ncm",
                type: "varchar",
                length: "8",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("product", "ncm");
    }

}
