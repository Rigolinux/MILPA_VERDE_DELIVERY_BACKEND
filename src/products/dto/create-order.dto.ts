import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderDetailsDto {
  @IsString()
  @IsNotEmpty()
  ID_Product: string;

  @IsNotEmpty()
  @IsString()
  product: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;
}

export class CreateOrdertDto {
  @IsEnum(['PENDING', 'REJECTED', 'APPROVED'])
  status: string;

  @IsNotEmpty()
  provider: string;

  @IsNotEmpty()
  @IsDateString({ strict: true } as any)
  OrderDate: Date;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @ValidateNested({ each: true })
  @Type(() => OrderDetailsDto)
  details: OrderDetailsDto[];
}
