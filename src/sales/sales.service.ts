import { Injectable } from '@nestjs/common';
import { CreateSalesHeaderDto, UpdateSaleDto } from './dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalesHeader, SalesDetails } from './entities';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(SalesHeader.name)
    private readonly SalesHeaderModel: Model<SalesHeader>,
    @InjectModel(SalesDetails.name)
    private readonly SalesDetailsModel: Model<SalesDetails>,
  ) {}

  create(createSaleDto: CreateSalesHeaderDto) {
    return 'This action adds a new sale';
  }

  findAll() {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
