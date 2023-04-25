import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesHeaderDto } from './create-sale.dto';

export class UpdateSaleDto extends PartialType(CreateSalesHeaderDto) {}
