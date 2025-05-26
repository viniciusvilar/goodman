import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnStockToProduct1748286540926 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "product",
            new TableColumn({
                name: "stock",
                type: "float",
                default: 0,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("product", "stock");
    }

}
