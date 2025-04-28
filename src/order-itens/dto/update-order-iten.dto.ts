import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItenDto } from './create-order-iten.dto';

export class UpdateOrderItenDto extends PartialType(CreateOrderItenDto) {}
