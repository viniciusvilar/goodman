import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { error } from 'console';
import { UnitService } from 'src/unit/unit.service';
import { consultarNCM } from './functions/consulta-ncm';
import { NcmProduct } from './dto/ncm-product.dto';
import { TaxService } from 'src/tax/tax.service';

@Injectable()
export class ProductsService {
  
  @InjectRepository(Product)
  private readonly productRepository : Repository<Product>

  constructor(
    private readonly unitService: UnitService,
    private readonly taxService: TaxService
  ) {}
  
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { unit: unitCode, tax: taxCode, ...rest} = createProductDto

    const unit = await this.unitService.findOne(unitCode)

    const tax = await this.taxService.findOne(taxCode)

    if (!unit) {
      throw new Error("Unit not found")
    }

    if (!tax) {
      throw new Error("Tax not found")
    }

    const product = this.productRepository.create({
      ...rest,
      tax,
      unit
    })
    

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find()
  }

  async findOne(idProduct: number): Promise<Product | null> {
    const product = this.productRepository.findOneBy({
      id: idProduct
    })
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const { unit: unitCode, ...rest } = updateProductDto;
  
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['unit'],
    });
  
    if (!product) {
      throw new Error('Product not found');
    }
  
    if (unitCode) {
      const unit = await this.unitService.findOne(unitCode);
  
      if (!unit) {
        throw new Error('Unit not found');
      }
  
      product.unit = unit;
    }
  
    Object.assign(product, rest);
  
    return await this.productRepository.save(product);
  }
  

  async remove(id: number) {
    const product = await this.findOne(id)
    if (!product) {
      throw new Error("Product not found!")
    }
    if (product.active) {
      product.active = false
      await this.productRepository.save(product)
      return product
    }
    
    throw new Error("Product alreadys false!")
  }

  async active(id: number) {
    const product = await this.findOne(id)
    if (!product) {
      throw new Error("Product not found!")
    }
    if (!product.active) {
      product.active = true
      await this.productRepository.save(product)
      return product
    }
    
    throw new Error("Product alreadys true!")
  }

  async setNCM(id: number, ncm : NcmProduct) {
    const product = await this.findOne(id)

    if (!product) {
      throw new Error("Product not found!")
    }
    const ncmList = await consultarNCM();

    const ncmExists = ncmList.find(item => item.codigo === ncm.ncm)

    if (!ncmExists) {
      throw new Error("NCM not found!")
    }

    product.ncm = ncm.ncm

    return this.productRepository.save(product)
  }
}
