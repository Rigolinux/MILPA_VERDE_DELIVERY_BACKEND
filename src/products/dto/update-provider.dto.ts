import { PartialType } from '@nestjs/mapped-types';
import { CreateProvidertDto } from './create-Provider';

export class UpdateProvidertDto extends PartialType(CreateProvidertDto) {}
