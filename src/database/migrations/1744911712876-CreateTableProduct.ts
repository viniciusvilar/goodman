import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableProduct1744911712876 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "product",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "barcode",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "additionalCode",
                        type: "varchar",
                    },
                    {
                        name: "unit",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "numeric",
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product");
    }
}
