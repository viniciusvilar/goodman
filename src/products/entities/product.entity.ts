import { Unit } from "src/unit/entities/unit.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    @ManyToOne(() => Unit, { eager: true })
    unit: Unit

    @Column()
    price: Number

    @Column({default: true})
    active: Boolean
}
