import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { FindByEmailDto } from './dto/find-by-email.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorato';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res : Response) {
    try {
      const user = await this.userService.create(createUserDto)
      return res.status(HttpStatus.CREATED).json({
        data: user
      })
    } catch (error) {
      console.error("Error creating user ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.message
      })
    } 
  }

  @Get()
  async findAll(@Res() res : Response) {
    try {
      const user = await this.userService.findAll()
      return res.status(HttpStatus.OK).json({
        data: user
      })
    } catch (error) {
      console.error("Error listing users ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.detail
      })
    }
  }

  @Get('findbyid/:id')
  async findOne(@Param('id') id: string, @Res() res : Response) {
    try {
      const user = await this.userService.findOne(+id)
      return res.status(HttpStatus.OK).json({
        data: user
      })
    } catch (error) {
      console.error("Error to find user ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.message
      })
    }
  }

  @Get("findbyemail")
  async findByEmail(@Body() findByEmail : FindByEmailDto, @Res() res : Response) {
    try {
      const user = await this.userService.findByEmail(findByEmail.email)
      return res.status(HttpStatus.OK).json({
        data: user
      })
    } catch (error) {
      console.error("Error to find user ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.message
      })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res : Response) {
    try {
      const user = await this.userService.update(+id, updateUserDto)
      return res.status(HttpStatus.OK).json({
        data: user
      })
    } catch (error) {
      console.error("Error updating user ", error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: error.message
      })
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
