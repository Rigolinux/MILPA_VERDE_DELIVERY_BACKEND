import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  ID_Recipe: string;

  @IsNotEmpty()
  Stock: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  FechaCaducidad: string;
}
