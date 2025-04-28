import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("/create")
  async create(@Body() createOrderDto: CreateOrderDto, @Res() res : Response) {
    try {
      const order = await this.orderService.create(createOrderDto)
      return res.status(HttpStatus.CREATED).json({
        message: "Pedido criado com sucesso",
        data: order
      })
    } catch (error) {
      console.error("Erro ao criar pedido ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao criar pedido",
        data: error.message
      })
    }
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
