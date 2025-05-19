import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablePayment1747682676125 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payment",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "type",
                        type: "enum",
                        enum: ["A VISTA", "CARTAO DE CREDITO", "CARTAO DE DEBITO", "PIX", "A PRAZO"],
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "installment",
                        type: "boolean",
                        default: false,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payment");
    }

}
