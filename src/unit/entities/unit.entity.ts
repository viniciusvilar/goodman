import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Unit {
    @PrimaryGeneratedColumn()
    id: Number
    @Column()
    name: String
    @Column({unique: true})
    code: String
    @Column({default: true})
    active: Boolean
}
