import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
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
      console.error("Erro ao criar produto ", error.message)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao criar produto",
        data: error.detail
      })
    }
  }

  @Get()
  async findAll(@Res() res : Response) {
    try {
      const products = await this.productsService.findAll();
      return res.status(HttpStatus.OK).json({
        data: products
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.message
      })
    }
    
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res : Response) {
    try {
      const product = await this.productsService.findOne(+id)
      return res.status(HttpStatus.OK).json({
        data: product
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.message
      })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@Res() res: Response) {
    try {
      const updatedProduct = await this.productsService.update(+id, updateProductDto);
      return res.status(HttpStatus.OK).json({
        message: 'Produto atualizado com sucesso',
        data: updatedProduct,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erro ao atualizar produto',
        error: error.message,
      });
    }
  }


  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res : Response) {
    try {
      const product = await this.productsService.remove(+id)
      return res.status(HttpStatus.OK).json({
        data: product
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.message
      })
    }
  }

  @Put(':id')
  async active(@Param('id') id: string, @Res() res : Response) {
    try {
      const product = await this.productsService.active(+id)
      return res.status(HttpStatus.OK).json({
        data: product
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.message
      })
    }
  }
}
