import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PersonService } from 'src/person/person.service';
import { Order } from './entities/order.entity';
import { Person } from 'src/person/entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Person])],
  controllers: [OrderController],
  providers: [OrderService, PersonService],
  exports: [OrderService]
})
export class OrderModule {}
