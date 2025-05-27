import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tax } from './entities/tax.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { UnitService } from 'src/unit/unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tax, Unit])],
  controllers: [TaxController],
  providers: [TaxService, UnitService],
  exports: [TaxService]
})
export class TaxModule {}
