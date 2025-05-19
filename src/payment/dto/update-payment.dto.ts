import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentType } from '../enum/payment-type-enum';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsEnum(PaymentType)
    type?: PaymentType;
}
