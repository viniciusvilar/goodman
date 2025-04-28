import { Order } from "src/order/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderIten {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: Order;
  
    @ManyToOne(() => Product, (product) => product.orderItems, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    quantity: number

    @Column()
    subtotal: number

    @Column()
    total: number

    @Column()
    discount: number

    @Column()
    surcharge: number
}
