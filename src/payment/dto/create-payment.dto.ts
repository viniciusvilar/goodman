import { IsBoolean, IsEnum, IsString } from "class-validator"
import { PaymentType } from "../enum/payment-type-enum"

export class CreatePaymentDto {    
    @IsString()
    name: string
    
    @IsEnum(PaymentType)
    type: PaymentType
    
    @IsBoolean()
    installment: boolean
}
