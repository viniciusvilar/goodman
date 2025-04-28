import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableOrder1745789239017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "order",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "begin_date",
                type: "timestamp",
                isNullable: false,
              },
              {
                name: "begin_finish",
                type: "timestamp",
                isNullable: false,
              },
              {
                name: "person_id",
                type: "int",
                isNullable: false,
              },
              {
                name: "status",
                type: "enum",
                enum: ["PENDENTE", "EM_ANDAMENTO", "FINALIZADO"],
                default: `'PENDENTE'`,
              },
            ],
          }),
          true
        );
    
        await queryRunner.createForeignKey(
          "order",
          new TableForeignKey({
            columnNames: ["person_id"],
            referencedTableName: "person",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("order");
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("person_id") !== -1);
        if (foreignKey) {
          await queryRunner.dropForeignKey("order", foreignKey);
        }
    
        await queryRunner.dropTable("order");
      }

}
