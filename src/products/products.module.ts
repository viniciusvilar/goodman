import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UnitModule } from 'src/unit/unit.module';
import { UnitService } from 'src/unit/unit.service';
import { Unit } from 'src/unit/entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Unit])],
  controllers: [ProductsController],
  providers: [ProductsService, UnitService],
})
export class ProductsModule {}
