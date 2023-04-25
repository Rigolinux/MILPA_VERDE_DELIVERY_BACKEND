import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class RecipeDetailsDto {
  @IsString()
  @IsNotEmpty()
  ID_Product: string;

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

export class CreateRecipeDto {
  @IsEnum(['InUse', 'Inactive'])
  status: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  Stock: number;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @ValidateNested({ each: true })
  @Type(() => RecipeDetailsDto)
  details: RecipeDetailsDto[];
}
