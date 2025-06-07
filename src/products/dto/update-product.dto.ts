import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    barcode?: string;
  
    @IsOptional()
    @IsString()
    additionalCode?: string;
  
    @IsOptional()
    @IsNumber()
    unit?: number;
  
    @IsOptional()
    price?: number;
}
