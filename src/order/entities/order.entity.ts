import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../enum/status-enum";
import { Person } from "src/person/entities/person.entity";

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
        default: OrderStatus.PENDENTE,
    })
    status: OrderStatus

    @Column()
    substotal: number

    @Column()
    total: number

    @Column()
    discount: number

    @Column()
    surcharge: number
}
