import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DELIVERED = 'DELIVERED',
}

// EXPORTE ESTA ONDA
export class SalesDetailsDto {
  @IsString()
  @IsNotEmpty()
  ID_sale: string;

  @IsString()
  @IsNotEmpty()
  ID_recipe: string;

  @IsString()
  @IsNotEmpty()
  dateOfbuy: string;

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

export class CreateSalesHeaderDto {
  @IsString()
  @IsNotEmpty()
  ID_USER: string;

  @IsNotEmpty()
  @IsString()
  dateOfbuy: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsEnum(Status)
  status: string;

  @IsString()
  dateOfDelivered: string;

  @IsNotEmpty()
  @IsString()
  TransferNumber: string;

  @IsNotEmpty()
  @IsEnum(Status)
  TransferStatus: string;

  @ValidateNested({ each: true })
  @Type(() => SalesDetailsDto)
  details: SalesDetailsDto[];
}
