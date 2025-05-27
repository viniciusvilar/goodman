import { IsNumber, IsNumberString, IsOptional, IsString, Length } from "class-validator";

export class CreateTaxDto {
    @IsString()
    tax: string;
  
    @IsOptional()
    @IsNumberString()
    @Length(3, 3)
    cst?: number;
  
    @IsOptional()
    @IsNumberString()
    @Length(4, 4)
    csosn?: number;
  
    @IsOptional()
    @IsNumberString()
    @Length(4, 4)
    cfop_consumo_interna?: number;
  
    @IsOptional()
    @IsNumberString()
    @Length(4, 4)
    cfop_consumo_externa?: number;
  
    @IsOptional()
    @IsNumberString()
    @Length(4, 4)
    cfop_venda_interna?: number;
  
    @IsOptional()
    @IsNumberString()
    @Length(4, 4)
    cfop_venda_externa?: number;
  
    @IsOptional()
    @IsNumber()
    aliquota_icms?: number;
  
    @IsOptional()
    @IsNumber()
    aliquota_reducao?: number;
  
    @IsOptional()
    @IsNumberString()
    @Length(3, 3)
    cst_pis_cofins?: number;
  
    @IsOptional()
    @IsNumber()
    aliquota_pis?: number;
  
    @IsOptional()
    @IsNumber()
    aliquota_cofins?: number;
  
    @IsOptional()
    @IsNumberString()
    @Length(3, 3)
    cst_cupom?: number;
  
    @IsOptional()
    @IsNumberString()
    @Length(4, 4)
    cfop_cupom?: number;
}
