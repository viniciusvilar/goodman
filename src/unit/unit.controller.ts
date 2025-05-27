import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Response } from 'express';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller('v1/unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post("/create")
  async create(@Body() createUnitDto: CreateUnitDto, @Res() res : Response) {
    try {
      const unit = await this.unitService.create(createUnitDto);
      return res.status(HttpStatus.CREATED).json({
        message: "Unit created successfully",
        data: unit
      })
    } catch (error) {
      console.error("Error to create unit ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error to create unit",
        data: error.detail
      })
    }
    
  }

  @Get()
  async findAll(@Res() res : Response) {
    try {
      const unit = await this.unitService.findAll()
      return res.status(HttpStatus.OK).json({
        data: unit
      })
    } catch (error) {
      console.log("Error to list unit ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error to list unit",
        data: error.detail
      })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res : Response) {
    try {
      const unit = await this.unitService.findOne(+id)
      return res.status(HttpStatus.OK).json({
        data: unit
      })
    } catch (error) {
      console.log("Error to list unit ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error to list unit",
        data: error.detail
      })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto, @Res() res : Response) {
    try {
      const unit = await this.unitService.update(+id, updateUnitDto)
      return res.status(HttpStatus.OK).json({
        data: unit
      })
    } catch (error) {
      console.log("Error to update unit ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error to update unit",
        data: error.detail
      })
    }
    
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res : Response) {
    try {
      const unit = await this.unitService.remove(+id)
      return res.status(HttpStatus.OK).json({
        data: unit
      })
    } catch (error) {
      console.log("Error to delete unit ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error to delete unit",
        data: error.detail
      })
    }
  }

  @Put(':id')
  async active(@Param('id') id: string, @Res() res : Response) {
    try {
      const unit = await this.unitService.active(+id)
      return res.status(HttpStatus.OK).json({
        data: unit
      })
    } catch (error) {
      console.log("Error to active unit ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error to active unit",
        data: error.detail
      })
    }
  }
}
