import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateAndUpdateUnitDto } from './dto/create-update-unit.dto';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  create(@Body() createAndUpdateUnitDto: CreateAndUpdateUnitDto) {
    return this.unitService.create(createAndUpdateUnitDto);
  }

  @Get()
  findAll() {
    return this.unitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitDto: CreateAndUpdateUnitDto) {
    return this.unitService.update(+id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitService.remove(+id);
  }
}
