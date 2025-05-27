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
        message: "Payment created successfully",
        data: payment
      })
    } catch (error) {
      console.error("Error creating payment ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Error creating payment",
        data: error.detail
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
      console.error("Error listing payment ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Error listing payment",
        data: error.detail
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
      console.error("Error finding payment ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Error finding payment",
        data: error.detail
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
      console.error("Error updating payment ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Error updating payment",
        data: error.detail
      })
    }
  }

  @Put(':id')
  async inactive(@Param('id') id: string, @Res() res : Response) {
    try {
      const payment = await this.paymentService.inactive(+id)
      return res.status(HttpStatus.OK).json({
        message: "Payment successfully deactivated",
        data: payment
      })
    } catch (error) {
      console.error("Error disabling payment ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Error disabling payment",
        data: error.detail
      })
    }
  }

  @Put('active/:id')
  async active(@Param('id') id: string, @Res() res : Response) {
    try {
      const payment = await this.paymentService.active(+id)
      return res.status(HttpStatus.OK).json({
        message: "Payment activated successfully",
        data: payment
      })
    } catch (error) {
      console.error("Error activating payment ", error.message)
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: "Error activating payment",
        data: error.detail
      })
    }
  }
}
