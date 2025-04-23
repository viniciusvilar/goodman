import { Injectable } from '@nestjs/common';
import { CreateAndUpdateUnitDto } from './dto/create-update-unit.dto';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UnitService {

  @InjectRepository(Unit)
  private readonly unitRepository : Repository<Unit>

  create(createAndUpdateUnitDto: CreateAndUpdateUnitDto) {
    return 'This action adds a new unit';
  }

  findAll() {
    return `This action returns all unit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unit`;
  }

  update(id: number, updateUnitDto: CreateAndUpdateUnitDto) {
    return `This action updates a #${id} unit`;
  }

  remove(id: number) {
    return `This action removes a #${id} unit`;
  }
}
