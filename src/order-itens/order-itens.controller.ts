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
        message: "Produto adicionado com sucesso",
        data: orderIten
      })
    } catch (error) {
      console.log("Erro ao adicionar produto ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao adicionar produto",
        data: error.message
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItensService.remove(+id);
  }
}
