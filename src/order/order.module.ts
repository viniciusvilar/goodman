import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PersonService } from 'src/person/person.service';
import { Order } from './entities/order.entity';
import { Person } from 'src/person/entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/payment/entities/payment.entity';
import { PaymentService } from 'src/payment/payment.service';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { Unit } from 'src/unit/entities/unit.entity';
import { UnitService } from 'src/unit/unit.service';
import { OrderIten } from 'src/order-itens/entities/order-iten.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Person, Payment, Product, Unit, OrderIten, Product])],
  controllers: [OrderController],
  providers: [OrderService, PersonService, PaymentService, ProductsService, UnitService],
  exports: [OrderService]
})
export class OrderModule {}
