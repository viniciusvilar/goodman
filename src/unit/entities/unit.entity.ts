import { Product } from "src/products/entities/product.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

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

    @OneToMany(() => Product, (product) => product.unit)
    products: Product[]
}
