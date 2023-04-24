import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdertDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrdertDto) {}
