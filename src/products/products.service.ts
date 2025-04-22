import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class ProductsService {
  
  @InjectRepository(Product)
  private readonly productRepository : Repository<Product>
  
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto)
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
    const product = await this.findOne(id);
  
    if (!product) {
      throw new Error("Produto not exists!");
    }
  
    const updatedProduct = this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(updatedProduct);
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
