import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './enum/status-enum';
import { UpdateOrderStatusDto } from './dto/update-status-order.dto';
import { PaymentDto } from './dto/payment.dto';

@Controller('v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("/create")
  async create(@Body() createOrderDto: CreateOrderDto, @Res() res : Response) {
    try {
      const order = await this.orderService.create(createOrderDto)
      return res.status(HttpStatus.CREATED).json({
        message: "Order created successfully",
        data: order
      })
    } catch (error) {
      console.error("Error creating order ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error creating order",
        data: error.detail
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
      console.error("Error listing orders ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error listing orders",
        data: error.detail
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
      console.error("Error listing order ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error listing order",
        data: error.detail
      })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto, @Res() res : Response) {
    try {
      const order = await this.orderService.updateStatus(+id, updateOrderStatusDto)
      return res.status(HttpStatus.OK).json({
        data: order
      })
    } catch (error) {
      console.error("Error changing order status ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error changing order status",
        data: error.detail
      })
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Patch('finalize/:id')
  async finalize(@Param("id") id: string, @Body() paymentDto : PaymentDto, @Res() res : Response) {
    try {
      const order = await this.orderService.finalize(+id, paymentDto)
      return res.status(HttpStatus.OK).json({
        data: order
      })
    } catch (error) {
      console.error("Error completing order ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error completing order",
        data: error.detail
      })
    }
  }

  @Patch('refund/:id')
  async refund(@Param("id") id: string, @Res() res : Response) {
    try {
      const order = await this.orderService.refund(+id)
      return res.status(HttpStatus.OK).json({
        data: order
      })
    } catch (error) {
      console.error("Error canceling order ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error canceling order",
        data: error.detail
      })
    }
  }
}
