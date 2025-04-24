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
      return res.status(HttpStatus.OK).json({
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
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
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
