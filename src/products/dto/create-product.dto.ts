import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';

enum Category {
  Food = 'Food',
  Packaging = 'Packaging',
  Other = 'Other',
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  image: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Category)
  category: string;
}
