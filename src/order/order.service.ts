import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class OrderService {

  @InjectRepository(Order)
  private readonly orderRepository : Repository<Order>

  constructor(private readonly personService : PersonService) {}


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

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
