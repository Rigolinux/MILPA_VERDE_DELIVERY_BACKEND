import { PartialType } from '@nestjs/mapped-types';
import { OrderDetailsDto } from './create-order.dto';
import { CreateOrdertDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrdertDto) {}
