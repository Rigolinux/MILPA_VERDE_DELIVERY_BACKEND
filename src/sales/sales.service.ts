import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalesHeaderDto, UpdateSaleDto } from './dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SalesHeader, SalesDetails } from './entities';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(SalesHeader.name)
    private readonly SalesHeaderModel: Model<SalesHeader>,
    @InjectModel(SalesDetails.name)
    private readonly SalesDetailsModel: Model<SalesDetails>,
  ) {}

  async createSale(createSaleDto: CreateSalesHeaderDto) {
    const { details, ...SalesHeader } = createSaleDto;
    const sale = await this.SalesHeaderModel.create(SalesHeader);

    const SalesDetails = details.map((detail) => ({
      ...detail,
      ID_sale: sale._id,
    }));
    const arrayDetails = [];
    for (let i = 0; i < SalesDetails.length; i++) {
      const detail = await this.SalesDetailsModel.create(SalesDetails[i]);
      arrayDetails.push(detail);
    }
    const dbDetails = await Promise.all(arrayDetails);
    return {
      saleHeader: sale,
      details: dbDetails,
    };
  }

  async findAllSales() {
    return await this.SalesHeaderModel.find();
  }

  async findOneSale(id: string) {
    const sale = await this.SalesHeaderModel.findById(id);
    if (!sale) {
      throw new NotFoundException(`Sale #${id} not found`);
    }
    return sale;
  }

  async findAllSalesByCustomer(id: string) {
    const ObjectId = Types.ObjectId;
    const sales = await this.SalesHeaderModel.find({
      ID_USER: new ObjectId(id),
    });
    if (!sales) {
      throw new NotFoundException(`Sale #${id} not found`);
    }
    return sales;
  }
}
