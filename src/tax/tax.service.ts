import { Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Repository } from 'typeorm';
import { Tax } from './entities/tax.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaxService {

  @InjectRepository(Tax)
  private readonly taxRepository : Repository<Tax>


  async create(createTaxDto: CreateTaxDto) : Promise<Tax> {
    const tax = await this.taxRepository.create(createTaxDto)

    return this.taxRepository.save(tax)

  }

  async findAll() : Promise<Tax[]> {
    return this.taxRepository.find();
  }

  async findOne(id: number) : Promise<Tax | null> {
    const tax =  await this.taxRepository.findOneBy({id})
    return tax
  }

  async update(id: number, updateTaxDto: UpdateTaxDto) : Promise<Tax> {
    const tax = await this.findOne(id)

    if (!tax) {
      throw new Error("Tax not found!")
    }
    
    const taxUpdated = await this.taxRepository.merge(tax, updateTaxDto)

    return await this.taxRepository.save(taxUpdated)
  }

  remove(id: number) {
    return `This action removes a #${id} tax`;
  }
}
