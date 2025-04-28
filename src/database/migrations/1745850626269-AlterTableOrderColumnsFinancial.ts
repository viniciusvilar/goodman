import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableOrderColumnsFinancial1745850626269 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('order', [
          new TableColumn({
            name: 'subtotal',
            type: 'float',
            isNullable: true,
          }),
          new TableColumn({
            name: 'total',
            type: 'float',
            isNullable: true,
          }),
          new TableColumn({
            name: 'discount',
            type: 'float',
            isNullable: true,
          }),
          new TableColumn({
            name: 'surcharge',
            type: 'float',
            isNullable: true,
          }),
        ]);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('order', 'subtotal');
        await queryRunner.dropColumn('order', 'total');
        await queryRunner.dropColumn('order', 'discount');
        await queryRunner.dropColumn('order', 'surcharge');
      }

}
