import { Injectable } from '@nestjs/common';
import { CreateProductDto, CreateOrdertDto, UpdateProductDto } from './dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BOrdersDetails } from './entities/BOrdersDetails.entity';
import { BOrdersHeader } from './entities/BOrdersHeader.entity';
import { Products } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private readonly productModel: Model<Products>,
    @InjectModel(BOrdersHeader.name)
    private readonly OrdersHeaderModel: Model<BOrdersHeader>,
    @InjectModel(BOrdersDetails.name)
    private readonly OrdersDetailsModel: Model<BOrdersDetails>,
  ) {}

  create(createOrder: CreateOrdertDto) {
    return createOrder;
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
