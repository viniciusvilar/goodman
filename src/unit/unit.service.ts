import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitService {

  @InjectRepository(Unit)
  private readonly unitRepository : Repository<Unit>

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    const unit = this.unitRepository.create(createUnitDto)
    return await this.unitRepository.save(unit)
  }

  async findAll(): Promise<Unit[]> {
    return await this.unitRepository.find();
  }

  async findOne(id: number): Promise<Unit | null> {
    const unit = await this.unitRepository.findOneBy({id})
    return unit
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.findOne(+id)

    if (!unit) {
      throw new Error("Unit not exist!")
    }

    const updatedUnit = this.unitRepository.merge(unit, updateUnitDto)
    return await this.unitRepository.save(updatedUnit)
  }

  async remove(id: number) {
    const unit = await this.findOne(id)
    if (!unit) {
      throw new Error("Unit not exist!")
    }
    if (unit.active) {
      unit.active = false
      await this.unitRepository.save(unit)
      return unit
    }

    throw new Error("Unit already false")
  }

  async active(id: number) {
    const unit = await this.findOne(id)
    if (!unit) {
      throw new Error("Unit not exist!")
    }
    if (!unit.active) {
      unit.active = true
      await this.unitRepository.save(unit)
      return unit
    }

    throw new Error("Unit already true")
  }
  
}
