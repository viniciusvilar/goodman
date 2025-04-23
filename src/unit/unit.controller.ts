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
        message: "Unidade criada com sucesso",
        data: unit
      })
    } catch (error) {
      console.error("Erro ao criar unidade ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao criar unidade",
        data: error.message
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
      console.log("Erro ao listar unidades ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao listar unidades",
        data: error.message
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
      console.log("Erro ao listar unidade ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao listar unidade",
        data: error.message
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
      console.log("Erro ao atualizar unidade ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao listar unidade",
        data: error.message
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
      console.log("Erro ao apagar unidade ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao apagar unidade",
        data: error.message
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
      console.log("Erro ao ativar unidade ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao ativar unidade",
        data: error.message
      })
    }
  }
}
