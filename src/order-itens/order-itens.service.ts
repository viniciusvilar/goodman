import { Injectable } from '@nestjs/common';
import { CreateOrderItenDto } from './dto/create-order-iten.dto';
import { UpdateOrderItenDto } from './dto/update-order-iten.dto';
import { Repository } from 'typeorm';
import { OrderIten } from './entities/order-iten.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class OrderItensService {

  @InjectRepository(OrderIten)
  private readonly orderItensRepository : Repository<OrderIten>

  constructor(
    private readonly productService : ProductsService, 
    private readonly orderService : OrderService
  ) {}


  async create(createOrderItenDto: CreateOrderItenDto) {
    let order = await this.orderService.findOne(createOrderItenDto.order_id)
    const product = await this.productService.findOne(createOrderItenDto.product_id)

    if (!order) {
      throw new Error("Pedido não existe!")
    }

    if (order.status != "ANDAMENTO") {
      throw new Error ("O pedido não está em ANDAMENTO")
    }

    if (!product) {
      throw new Error("Produto não existe!")
    }

    const orderItens = await this.orderItensRepository.create({
      order: order,
      product: product,
      quantity: createOrderItenDto.quantity,
      discount: createOrderItenDto.discount,
      surcharge: createOrderItenDto.surcharge,
      subtotal: product.price * createOrderItenDto.quantity,
      total: (product.price * createOrderItenDto.quantity) - createOrderItenDto.discount + createOrderItenDto.surcharge
    })

    order.subtotal += orderItens.subtotal
    order.discount += orderItens.discount
    order.surcharge += orderItens.surcharge
    order.total += orderItens.total

    await this.orderService.attPrice(order);


    return await this.orderItensRepository.save(orderItens)
  }

  async findAll() {
    return await this.orderItensRepository.find({
      relations: ["order", "product"]
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} orderIten`;
  }

  update(id: number, updateOrderItenDto: UpdateOrderItenDto) {
    return `This action updates a #${id} orderIten`;
  }
}
