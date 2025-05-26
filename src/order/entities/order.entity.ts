import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../enum/status-enum";
import { Person } from "src/person/entities/person.entity";
import { OrderIten } from "src/order-itens/entities/order-iten.entity";
import { Payment } from "src/payment/entities/payment.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    begin_date: Date

    @Column()
    begin_finish: Date

    @ManyToOne(() => Person)
    @JoinColumn({ name: 'person_id' })
    person: Person

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.EM_ANDAMENTO,
    })
    status: OrderStatus

    @Column()
    subtotal: number

    @Column()
    total: number

    @Column()
    discount: number

    @Column()
    surcharge: number

    @OneToMany(() => OrderIten, item => item.order)
    items: OrderIten[];

    @ManyToOne(() => Payment)
    @JoinColumn({ name: 'payment_id' })
    payment: Payment;
}
