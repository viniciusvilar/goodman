import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablePerson1745521719553 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "person",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "corporate_name",
                type: "varchar",
              },
              {
                name: "trade_name",
                type: "varchar",
              },
              {
                name: "doc_cpf_cnpj",
                type: "varchar",
                isUnique: true,
              },
              {
                name: "doc_ie",
                type: "varchar",
                isUnique: true,
              },
              {
                name: "address",
                type: "varchar",
              },
              {
                name: "district",
                type: "varchar",
              },
              {
                name: "city",
                type: "varchar",
              },
              {
                name: "state",
                type: "varchar",
              },
              {
                name: "uf_state",
                type: "varchar",
                length: "2",
              },
              {
                name: "city_code",
                type: "varchar",
              },
              {
                name: "state_code",
                type: "varchar",
              },
              {
                name: "zip_code",
                type: "varchar",
              },
              {
                name: "email",
                type: "varchar",
              },
              {
                name: "address_complement",
                type: "varchar",
              },
              {
                name: "country",
                type: "varchar",
              },
              {
                name: "country_code",
                type: "varchar",
              },
              {
                name: "uf_country",
                type: "varchar",
                length: "2",
              },
              {
                name: "phone1",
                type: "varchar",
                length: "13",
              },
              {
                name: "phone2",
                type: "varchar",
                length: "13",
              },
              {
                name: "active",
                type: "boolean",
                default: true,
              },
            ],
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person");
      }
    

}
