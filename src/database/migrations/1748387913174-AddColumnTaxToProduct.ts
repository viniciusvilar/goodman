import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColumnTaxToProduct1748387913174 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("product", new TableColumn({
            name: "taxId",
            type: "int",
            isNullable: true
        }));

        await queryRunner.createForeignKey("product", new TableForeignKey({
            columnNames: ["taxId"],
            referencedColumnNames: ["id"],
            referencedTableName: "tax",
            onDelete: "SET NULL"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("product");

        if (!table) return;
      
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.includes("taxId"));
      
        if (foreignKey) {
          await queryRunner.dropForeignKey("product", foreignKey);
        }
      
        const hasTaxIdColumn = table.columns.find(col => col.name === "taxId");
        if (hasTaxIdColumn) {
          await queryRunner.dropColumn("product", "taxId");
        }
    }

}
