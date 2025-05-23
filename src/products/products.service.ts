import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { error } from 'console';
import { UnitService } from 'src/unit/unit.service';

@Injectable()
export class ProductsService {
  
  @InjectRepository(Product)
  private readonly productRepository : Repository<Product>

  constructor(private readonly unitService: UnitService) {}
  
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { unit: unitCode, ...rest} = createProductDto

    const unit = await this.unitService.findByCode(unitCode)

    if (!unit) {
      throw new Error("Unidade não encontrada")
    }

    const product = this.productRepository.create({
      ...rest,
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
      throw new Error('Produto não encontrado');
    }
  
    // Se o DTO tiver a unidade, atualiza também
    if (unitCode) {
      const unit = await this.unitService.findByCode(unitCode);
  
      if (!unit) {
        throw new Error('Unidade não encontrada');
      }
  
      product.unit = unit;
    }
  
    // Atualiza os demais campos
    Object.assign(product, rest);
  
    return await this.productRepository.save(product);
  }
  

  async remove(id: number) {
    const product = await this.findOne(id)
    if (!product) {
      throw new Error("Product not exists!")
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
      throw new Error("Product not exists!")
    }
    if (!product.active) {
      product.active = true
      await this.productRepository.save(product)
      return product
    }
    
    throw new Error("Product alreadys true!")
  }
}
