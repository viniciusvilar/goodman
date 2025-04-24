import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Response } from 'express';

@Controller('v1/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post("/create")
  async create(@Body() createPersonDto: CreatePersonDto, @Res() res : Response) {
    try {
      const person = await this.personService.create(createPersonDto)
      return res.status(HttpStatus.CREATED).json({
        message: "Pessoa criada com sucesso",
        data: person
      })
    } catch (error) {
      console.error("Erro ao criar pessoa ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao criar pessoa",
        data: error.message
      })
    }
  }

  @Get()
  async findAll(@Res() res : Response) {
    try {
      const persons = await this.personService.findAll()
      return res.status(HttpStatus.OK).json({
        data: persons
      })
    } catch (error) {
      console.error("Erro ao listar pessoas ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao listar pessoas",
        data: error.message
      })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res : Response) {
    try {
      const person = await this.personService.findOne(+id)
      return res.status(HttpStatus.OK).json({
        data: person
      })
    } catch (error) {
      console.error("Erro ao listar pessoa ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao listar pessoa",
        data: error.message
      })
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
