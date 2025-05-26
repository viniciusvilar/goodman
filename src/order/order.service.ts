import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from 'src/person/person.service';
import { UpdateOrderStatusDto } from './dto/update-status-order.dto';
import { OrderStatus } from './enum/status-enum';
import { PaymentDto } from './dto/payment.dto';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrderService {

  @InjectRepository(Order)
  private readonly orderRepository : Repository<Order>

  constructor(
    private readonly personService : PersonService,
    private readonly paymentService : PaymentService
  ) {}

  async attPrice(order: Order) : Promise<Order> {
    const orderAtt = await this.orderRepository.save(order)

    return orderAtt
  }

  async create(createOrderDto: CreateOrderDto) : Promise<Order> {
    const person = await this.personService.findOne(+createOrderDto.person_id)

    if (!person) {
      throw new Error("Person not found!")
    }

    const now = new Date()

    const order = this.orderRepository.create({

      begin_date: new Date(now.getTime() - now.getTimezoneOffset() * 60000),
      person: person
    });

    return await this.orderRepository.save(order)
  }

  async findAll() : Promise<Order[]> {
    return await this.orderRepository.find()
  }

  async findOne(id: number) : Promise<Order | null> {
    const order = await this.orderRepository.findOneBy({ id })

    return order
  }

  async updateStatus(id: number, updateOrderStatusDto : UpdateOrderStatusDto) {
    const order = await this.findOne(id)

    if (!order) {
      throw new Error("Order not found!")
    }

    order.status = updateOrderStatusDto.status

    return await this.orderRepository.save(order)

  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async finalize(id: number, paymentDto: PaymentDto) : Promise<Order> {
    const order = await this.findOne(id)
    const payment = await this.paymentService.findOne(paymentDto.id)

    if (!order) {
      throw new Error("Pedido não existe!")
    }

    if (!payment) {
      throw new Error("Finalizadora não existe!")
    }

    if(order.status != OrderStatus.EM_ANDAMENTO) {
      throw new Error("Pedido precisa está com o status de ANDAMENTO")
    }

    order.payment = payment
    order.status = OrderStatus.FINALIZADO
    const now = new Date()
    order.begin_finish = new Date(now.getTime() - now.getTimezoneOffset() * 60000)

    return await this.orderRepository.save(order)
  }

  async refund (id: number) : Promise<Order> {
    const order = await this.findOne(id)

    if (!order) {
      throw new Error("Pedido não existe!")
    }

    if (order.status != OrderStatus.FINALIZADO) {
      throw new Error("Só é possível estornar pedidos finalizados")
    }

    order.status = OrderStatus.CANCELADO

    return await this.orderRepository.save(order)
  }
}
