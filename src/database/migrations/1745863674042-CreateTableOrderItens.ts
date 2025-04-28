import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableOrderItens1745863674042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'order_iten',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'order_id',
                type: 'int',
                isNullable: false,
              },
              {
                name: 'product_id',
                type: 'int',
                isNullable: false,
              },
              {
                name: 'quantity',
                type: 'int',
              },
              {
                name: 'subtotal',
                type: 'float',
              },
              {
                name: 'discount',
                type: 'float',
              },
              {
                name: 'surcharge',
                type: 'float',
              },
            ],
          }),
          true
        );
    
        await queryRunner.createForeignKey(
          'order_iten',
          new TableForeignKey({
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'order',
            onDelete: 'CASCADE',
          })
        );
    
        await queryRunner.createForeignKey(
          'order_iten',
          new TableForeignKey({
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'product',
            onDelete: 'RESTRICT',
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_iten');
      }

}
