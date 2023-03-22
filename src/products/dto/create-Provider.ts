import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateProvidertDto {
  @IsString()
  @IsNotEmpty()
  ProviderName: string;

  @IsString()
  @IsNotEmpty()
  mail: string;

  @IsNumber()
  @IsOptional()
  mobileNumber: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsOptional()
  @IsUrl()
  website: string;
}
