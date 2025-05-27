import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { OrderItensService } from './order-itens.service';
import { CreateOrderItenDto } from './dto/create-order-iten.dto';
import { UpdateOrderItenDto } from './dto/update-order-iten.dto';
import { Response } from 'express';

@Controller('v1/order-itens')
export class OrderItensController {
  constructor(private readonly orderItensService: OrderItensService) {}

  @Post("/create")
  async create(@Body() createOrderItenDto: CreateOrderItenDto, @Res() res : Response) {
    try {
      const orderIten = await this.orderItensService.create(createOrderItenDto)
      return res.status(HttpStatus.CREATED).json({
        message: "Product added successfully",
        data: orderIten
      })
    } catch (error) {
      console.log("Error adding product ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error adding product",
        data: error.detail
      })
    }
  }

  @Get()
  findAll() {
    return this.orderItensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItenDto: UpdateOrderItenDto) {
    return this.orderItensService.update(+id, updateOrderItenDto);
  }

  @Get("specify/:id")
  async findByIdOrder(@Param('id') id: string, @Res() res : Response) {
    try {
      const orderItens = await this.orderItensService.findByIdOrder(+id)
      return res.status(HttpStatus.CREATED).json({
        data: orderItens
      })
    } catch (error) {
      console.log("Error when listing ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error when listing",
        data: error.detail
      })
    }
  }
}
