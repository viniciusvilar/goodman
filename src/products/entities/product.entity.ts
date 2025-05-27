import { OrderIten } from "src/order-itens/entities/order-iten.entity";
import { Tax } from "src/tax/entities/tax.entity";
import { Unit } from "src/unit/entities/unit.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

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
    price: number

    @Column({default: true})
    active: Boolean

    @OneToMany(() => OrderIten, item => item.product)
    orderItems: OrderIten[];

    @Column({ type: "varchar", length: 8, nullable: true })
    ncm: string;

    @Column({ type: "float", default: 0 })
    stock: number;

    @ManyToOne(() => Tax, { nullable: true, eager: true })
    tax: Tax;
}
