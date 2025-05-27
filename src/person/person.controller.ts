import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Response } from 'express';
import { error } from 'console';

@Controller('v1/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post("/create")
  async create(@Body() createPersonDto: CreatePersonDto, @Res() res : Response) {
    try {
      const person = await this.personService.create(createPersonDto)
      return res.status(HttpStatus.CREATED).json({
        message: "Successfully created person",
        data: person
      })
    } catch (error) {
      console.error("Error creating person ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error creating person",
        data: error.detail
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
      console.error("Error listing person ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error listing person",
        data: error.detail
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
      console.error("Error listing person ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error listing person",
        data: error.detail
      })
    }
  }

  @Patch(':id')
  async update(  @Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto, @Res() res: Response) {
    try {
      const updatedPerson = await this.personService.update(+id, updatePersonDto);
      return res.status(HttpStatus.OK).json({
        message: 'Person updated successfully',
        data: updatedPerson,
      });
    } catch (error) {
      console.error('Error updating person', error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error updating person',
        data: error.detail,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res : Response) {
    try {
      const person = await this.personService.remove(+id)
      return res.status(HttpStatus.OK).json({
        data: person
      })
    } catch (error) {
      console.error("Error deleting person ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error deleting person",
        data: error.detail
      })
    }
    
  }

  @Put(':id')
  async active(@Param('id') id: string, @Res() res : Response) {
    try {
      const person = await this.personService.active(+id)
      return res.status(HttpStatus.OK).json({
        data: person
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error activing person",
        data: error.detail
      })
    }
    
  }
}
