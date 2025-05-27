import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { NcmProduct } from './dto/ncm-product.dto';

@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("/create")
  async create(@Body() createProductDto: CreateProductDto, @Res() res : Response) {
    try {
      const product = await this.productsService.create(createProductDto)
      return res.status(HttpStatus.CREATED).json({
        message: "Product created successfully",
        data: product
      })
    } catch (error) {
      console.error("Error to create product ", error.message)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error to create product",
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
        data: error.detail
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
        data: error.detail
      })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@Res() res: Response) {
    try {
      const updatedProduct = await this.productsService.update(+id, updateProductDto);
      return res.status(HttpStatus.OK).json({
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error to updated product',
        error: error.detail
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
        data: error.detail
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
        data: error.detail
      })
    }
  }

  @Post('setncm/:id')
  async setNcm(@Param('id') id: string, @Body() ncm : NcmProduct, @Res() res : Response) {
    try {
      const product = await this.productsService.setNCM(+id, ncm)
      return res.status(HttpStatus.OK).json({
        data: product
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.detail
      })
    }
  }

}
