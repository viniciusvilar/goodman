import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsString, Length } from 'class-validator';

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
    @IsString()
    @Length(2, 2)
    unit?: string;
  
    @IsOptional()
    price?: number;
}
