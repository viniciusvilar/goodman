import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';

@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("/create")
  async create(@Body() createProductDto: CreateProductDto, @Res() res : Response) {
    try {
      const product = await this.productsService.create(createProductDto)
      return res.status(HttpStatus.CREATED).json({
        message: "Produto criado com sucesso",
        data: product
      })
    } catch (error) {
      console.error("Erro ao criar produto ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao criar produto",
        data: error.message
      })
    }
  }

  @Get()
  findAll() {
    return "this.productsService.findAll()";
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
