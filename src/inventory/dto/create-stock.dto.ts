import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStockDto {
  @IsString()
  name: string;

  @IsOptional()
  description: string;

  @IsString()
  ID_Recipe: string;

  @IsNumber()
  Stock: number;

  @IsNumber()
  price: number;

  @IsString()
  FechaCaducidad: string;
}
