import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Length } from 'class-validator';
import { CreateUnitDto } from './create-unit.dto';

export class UpdateUnitDto extends PartialType(CreateUnitDto) {
    @IsOptional()
    @IsString()
    name?: string
    
    @IsOptional()
    @IsString()
    @Length(2, 2)
    code?: string
}
