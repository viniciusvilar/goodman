import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterColumnBeginFinish1745812754476 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
          "order",
          "begin_finish",
          new TableColumn({
            name: "begin_finish",
            type: "timestamp",
            isNullable: true, // <<< Permitir nulo
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
          "order",
          "begin_finish",
          new TableColumn({
            name: "begin_finish",
            type: "timestamp",
            isNullable: false, // <<< Reverter para NÃO nulo
          })
        );
      }

}
