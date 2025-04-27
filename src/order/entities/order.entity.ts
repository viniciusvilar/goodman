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
    person_id: number

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDENTE,
    })
    status: OrderStatus
}
