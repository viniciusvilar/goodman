import { IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    person_id: number
}
