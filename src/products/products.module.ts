import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UnitModule } from 'src/unit/unit.module';
import { UnitService } from 'src/unit/unit.service';
import { Unit } from 'src/unit/entities/unit.entity';
import { Tax } from 'src/tax/entities/tax.entity';
import { TaxService } from 'src/tax/tax.service';
import { TaxModule } from 'src/tax/tax.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Unit, Tax]), TaxModule],
  controllers: [ProductsController],
  providers: [ProductsService, UnitService, TaxService],
  exports: [ProductsService]
})
export class ProductsModule {}
