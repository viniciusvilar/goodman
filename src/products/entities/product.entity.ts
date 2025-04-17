import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    name: String

    @Column({unique: true})
    barcode: String

    @Column()
    additionalCode: String

    @Column()
    unit: String

    @Column()
    price: Number

    @Column({default: true})
    active: Boolean
}
