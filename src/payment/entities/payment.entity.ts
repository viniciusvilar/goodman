import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PaymentType } from "../enum/payment-type-enum";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        type: "enum",
        enum: PaymentType
    })
    type: PaymentType

    @Column({default: true})
    active?: boolean

    @Column({default: false})
    installment?: boolean
}
