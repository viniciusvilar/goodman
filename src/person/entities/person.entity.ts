import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  corporate_name: string;

  @Column()
  trade_name: string;

  @Column({ unique: true })
  doc_cpf_cnpj: string;

  @Column({ unique: true })
  doc_ie: string;

  @Column()
  address: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ length: 2 })
  uf_state: string;

  @Column()
  city_code: string;

  @Column()
  state_code: string;

  @Column()
  zip_code: string;

  @Column()
  email: string;

  @Column()
  address_complement: string;

  @Column()
  country: string;

  @Column()
  country_code: string;

  @Column({ length: 2 })
  uf_country: string;

  @Column({ length: 13 })
  phone1: string;

  @Column({ length: 13 })
  phone2: string;

  @Column({default: true})
  active: boolean
}
