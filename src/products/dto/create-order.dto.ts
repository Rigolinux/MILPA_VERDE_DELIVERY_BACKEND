import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// EXPORTE ESTA ONDA
export class OrderDetailsDto {
  @IsString()
  @IsNotEmpty()
  ID_Product: string;

  // No entiendo por que va esto aca si no hace nada
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
