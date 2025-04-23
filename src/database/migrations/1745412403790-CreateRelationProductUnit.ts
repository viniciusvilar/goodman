import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class CreateRelationProductUnit1745412403790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Remove a coluna antiga 'unit' do tipo varchar
        await queryRunner.dropColumn("product", "unit");
    
        // 2. Adiciona a nova coluna 'unitId' do tipo integer
        await queryRunner.addColumn(
          "product",
          new TableColumn({
            name: "unitId",
            type: "integer",
            isNullable: true, // pode ser false se quiser obrigar o vínculo
          })
        );
    
        // 3. Cria a foreign key entre product.unitId e unit.id
        await queryRunner.createForeignKey(
          "product",
          new TableForeignKey({
            columnNames: ["unitId"],
            referencedColumnNames: ["id"],
            referencedTableName: "unit",
            onDelete: "SET NULL", // ou "CASCADE" ou "RESTRICT"
            onUpdate: "CASCADE",
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverte: remove a foreign key, a coluna unitId e recria a antiga coluna unit (varchar)
    
        const table = await queryRunner.getTable("product");
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes("unitId"));
    
        if (foreignKey) {
          await queryRunner.dropForeignKey("product", foreignKey);
        }
    
        await queryRunner.dropColumn("product", "unitId");
    
        await queryRunner.addColumn(
          "product",
          new TableColumn({
            name: "unit",
            type: "varchar",
          })
        );
      }

}
