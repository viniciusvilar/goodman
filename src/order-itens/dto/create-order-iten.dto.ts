import { IsNumber } from "class-validator"

export class CreateOrderItenDto {
    @IsNumber()
    order_id: number

    @IsNumber()
    product_id: number

    @IsNumber()
    quantity: number

    @IsNumber()
    discount: number

    @IsNumber()
    surcharge: number
}
