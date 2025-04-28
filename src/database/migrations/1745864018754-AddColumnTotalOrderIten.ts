import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnTotalOrderIten1745864018754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'order_iten',
          new TableColumn({
            name: 'total',
            type: 'float',
            isNullable: true,
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('order_iten', 'total');
      }

}
