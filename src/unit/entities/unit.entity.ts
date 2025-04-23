import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Unit {
    @PrimaryGeneratedColumn()
    id: Number
    @Column({unique: true})
    name: String
    @Column({default: true})
    active: Boolean
}
