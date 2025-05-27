import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableTax1748382775826 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "tax",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "tax",
                type: "varchar",
                isNullable: false,
              },
              {
                name: "cst",
                type: "int",
                isNullable: true,
              },
              {
                name: "csosn",
                type: "int",
                isNullable: true,
              },
              {
                name: "cfop_consumo_interna",
                type: "int",
                isNullable: true,
              },
              {
                name: "cfop_consumo_externa",
                type: "int",
                isNullable: true,
              },
              {
                name: "cfop_venda_interna",
                type: "int",
                isNullable: true,
              },
              {
                name: "cfop_venda_externa",
                type: "int",
                isNullable: true,
              },
              {
                name: "aliquota_icms",
                type: "float",
                isNullable: true,
              },
              {
                name: "aliquota_reducao",
                type: "float",
                isNullable: true,
              },
              {
                name: "cst_pis_cofins",
                type: "int",
                isNullable: true,
              },
              {
                name: "aliquota_pis",
                type: "float",
                isNullable: true,
              },
              {
                name: "aliquota_cofins",
                type: "float",
                isNullable: true,
              },
              {
                name: "cst_cupom",
                type: "int",
                isNullable: true,
              },
              {
                name: "cfop_cupom",
                type: "int",
                isNullable: true,
              },
            ],
          }),
          true
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tax");
      }

}
