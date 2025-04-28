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
  async findAll(@Res() res : Response) {
    try {
      const orders = await this.orderService.findAll()
      return res.status(HttpStatus.OK).json({
        data: orders
      })
    } catch (error) {
      console.error("Erro ao listar pedidos ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao listar pedidos",
        data: error.message
      })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res : Response) {
    try {
      const order = await this.orderService.findOne(+id)
      return res.status(HttpStatus.OK).json({
        data: order
      })
    } catch (error) {
      console.error("Erro ao listar pedido ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao listar pedido",
        data: error.message
      })
    }
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
