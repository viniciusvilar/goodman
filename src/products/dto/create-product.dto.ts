import { IsNumber, IsString, Length } from "class-validator"

export class CreateProductDto {
    @IsString()
    name: string
    @IsString()
    barcode: string
    @IsString()
    additionalCode: string
    @IsString()
    @Length(2, 2)
    unit: string
    @IsNumber()
    price: number
}
