import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Response } from 'express';

@Controller('v1/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto, @Res() res : Response) {
    try {
      const payment = await this.paymentService.create(createPaymentDto)
      return res.status(HttpStatus.CREATED).json({
        message: "Finalizadora criada com sucesso",
        data: payment
      })
    } catch (error) {
      console.error("Erro ao criar finalizadora ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Erro ao criar finalizadora",
        data: error
      })
    }
  }

  @Get()
  async findAll(@Res() res : Response) {
    try {
      const payment = await this.paymentService.findAll()
      return res.status(HttpStatus.OK).json({
        data: payment
      })
    } catch (error) {
      console.error("Erro ao listar finalizadora ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Erro ao listar finalizadora",
        data: error
      })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res : Response) {
    try {
      const payment = await this.paymentService.findOne(+id);
      return res.status(HttpStatus.OK).json({
        data: payment
      })
    } catch (error) {
      console.error("Erro ao encontrar finalizadora ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Erro ao listar finalziadora",
        data: error
      })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto, @Res() res : Response) {
    try {
      const payment = await this.paymentService.update(+id, updatePaymentDto);
      return res.status(HttpStatus.OK).json({
        data: payment
      })
    } catch (error) {
      console.error("Erro ao atualizar finalizadora ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Erro ao atualizar finalziadora",
        data: error
      })
    }
  }

  @Put(':id')
  async inactive(@Param('id') id: string, @Res() res : Response) {
    try {
      const payment = await this.paymentService.inactive(+id)
      return res.status(HttpStatus.OK).json({
        message: "Finalizadora inativado com sucesso",
        data: payment
      })
    } catch (error) {
      console.error("Erro ao inativar finalizadora ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Erro ao inativar finalziadora",
        data: error.message
      })
    }
  }

  @Put('active/:id')
  async active(@Param('id') id: string, @Res() res : Response) {
    try {
      const payment = await this.paymentService.active(+id)
      return res.status(HttpStatus.OK).json({
        message: "Finalizadora ativada com sucesso",
        data: payment
      })
    } catch (error) {
      console.error("Erro ao ativar finalizadora ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Erro ao ativar finalziadora",
        data: error.message
      })
    }
  }
}
