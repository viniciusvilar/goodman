import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { TaxService } from './tax.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Response } from 'express';

@Controller('v1/tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  async create(@Body() createTaxDto: CreateTaxDto, @Res() res : Response) {
    try {
      const tax = await this.taxService.create(createTaxDto)
      return res.status(HttpStatus.CREATED).json({
        data: tax
      })
    } catch (error) {
      console.error("Error creating tax ", error.message)
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.detail
      })
    }
  }

  @Get()
  async findAll(@Res() res : Response) {
    try {
      const tax = await this.taxService.findAll()
      return res.status(HttpStatus.OK).json({
        data: tax
      })
    } catch (error) {
      console.error("Error listing tax ", error.message)
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.detail
      })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res : Response) {
    try {
      const tax = await this.taxService.findOne(+id)
      return res.status(HttpStatus.OK).json({
        data: tax
      })
    } catch (error) {
      console.error("Error list tax ", error.message)
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.detail
      })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaxDto: UpdateTaxDto, @Res() res : Response) {
    try {
      const tax = await this.taxService.update(+id, updateTaxDto)
      return res.status(HttpStatus.OK).json({
        data: tax
      })
    } catch (error) {
      console.error("Error to update tax ", error.message)
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.message
      })
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxService.remove(+id);
  }
}
