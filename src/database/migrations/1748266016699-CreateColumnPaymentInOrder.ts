import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class CreateColumnPaymentInOrder1748266016699 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "payment_id",
                type: "int",
                isNullable: true, // deixe true se o pagamento puder ser adicionado depois
            })
        );

        await queryRunner.createForeignKey(
            "order",
            new TableForeignKey({
                columnNames: ["payment_id"],
                referencedTableName: "payment",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("order");
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes("payment_id"));

        if (foreignKey) {
            await queryRunner.dropForeignKey("order", foreignKey);
        }

        await queryRunner.dropColumn("order", "payment_id");
    }
}


