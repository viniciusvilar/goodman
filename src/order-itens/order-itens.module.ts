import { Module } from '@nestjs/common';
import { OrderItensService } from './order-itens.service';
import { OrderItensController } from './order-itens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderIten } from './entities/order-iten.entity';
import { OrderModule } from 'src/order/order.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderIten]), OrderModule, ProductsModule],
  controllers: [OrderItensController],
  providers: [OrderItensService],
})
export class OrderItensModule {}
