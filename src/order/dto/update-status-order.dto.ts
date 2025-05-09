// update-order-status.dto.ts
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/status-enum';


export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
