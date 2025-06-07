import { IsNumber, IsString, Length } from "class-validator"

export class CreateProductDto {
    @IsString()
    name: string
    @IsString()
    barcode: string
    @IsString()
    additionalCode: string
    @IsNumber()
    unit: number
    @IsNumber()
    price: number
    @IsNumber()
    tax: number
}
