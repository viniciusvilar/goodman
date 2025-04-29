import { OrderIten } from "src/order-itens/entities/order-iten.entity";
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
}
