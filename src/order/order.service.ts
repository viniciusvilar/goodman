import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from 'src/person/person.service';
import { OrderStatus } from './enum/status-enum';
import { UpdateOrderStatusDto } from './dto/update-status-order.dto';

@Injectable()
export class OrderService {

  @InjectRepository(Order)
  private readonly orderRepository : Repository<Order>

  constructor(private readonly personService : PersonService) {}

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
}
