import { IsEmail, IsOptional, IsString, Length, Matches, MaxLength } from "class-validator";

export class CreatePersonDto {
  @IsString()
  corporate_name: string;

  @IsString()
  trade_name: string;

  @IsString()
  doc_cpf_cnpj: string;

  @IsString()
  doc_ie: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city_code?: string;

  @IsOptional()
  @IsString()
  state_code?: string;

  @IsOptional()
  @IsString()
  address_complement?: string;

  @IsString()
  @Length(8, 8, { message: 'uf_state deve conter exatamente 8 caracteres' })
  zip_code: string;

  @IsEmail()
  email: string;

  @IsString()
  country: string;

  @IsString()
  country_code: string;

  @IsString()
  @IsOptional()
  @Length(2, 2, { message: 'uf_state deve conter exatamente 2 caracteres' })
  uf_state?: string;

  @IsString()
  @Length(2, 2, { message: 'uf_country deve conter exatamente 2 caracteres' })
  uf_country: string;

  @IsString()
  @MaxLength(13, { message: 'phone1 deve ter no máximo 13 dígitos' })
  @Matches(/^\+?\d{0,13}$/, { message: 'phone1 deve conter apenas números (e opcionalmente o +)' })
  phone1: string;

  @IsString()
  @MaxLength(13, { message: 'phone2 deve ter no máximo 13 dígitos' })
  @Matches(/^\+?\d{0,13}$/, { message: 'phone2 deve conter apenas números (e opcionalmente o +)' })
  phone2: string;
}
