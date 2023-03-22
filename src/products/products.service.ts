import { Injectable } from '@nestjs/common';
import { CreateProductDto, CreateOrdertDto, UpdateProductDto } from './dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BOrdersDetails, BOrdersHeader, Products } from './entities/';

// transaction of mongoose
import { InjectConnection } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Connection } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private readonly productModel: Model<Products>,
    @InjectModel(BOrdersHeader.name)
    private readonly OrdersHeaderModel: Model<BOrdersHeader>,
    @InjectModel(BOrdersDetails.name)
    private readonly OrdersDetailsModel: Model<BOrdersDetails>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async findAllProducts() {
    return await this.productModel.find();
  }

  async findOneProduct(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async createOrder(createOrder: CreateOrdertDto) {
    this.connection.startSession();
    try {
      const { details, ...orderHeader } = createOrder;
      const orderHeaderModel = await this.OrdersHeaderModel.create(orderHeader);
      const orderDetails = details.map((detail) => ({
        ...detail,
        ID_Header: orderHeaderModel._id,
      }));
      const arrayDetails = [];
      for (let i = 0; i < orderDetails.length; i++) {
        const orderDetail = orderDetails[i];
        const orderDetailModel = await this.OrdersDetailsModel.create(
          orderDetail,
        );
        arrayDetails.push(orderDetailModel);
      }
      const detailsDB = await Promise.all(arrayDetails);
      this.connection.close();
      // to abort the transaction
      // this.connection.abortTransaction();
      return {
        orderHeader: orderHeaderModel,
        details: detailsDB,
      };
    } catch (error) {
      this.connection.close();
      console.log(error);
      return error;
    }
  }

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const createdProduct = await this.productModel.create(createProductDto);
      return createdProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAllOrderHeader() {
    return await this.OrdersHeaderModel.find();
  }

  async findOrderDetails(id: string) {
    try {
      const orderDetails = await this.OrdersDetailsModel.find({
        ID_Header: id,
      });
      return orderDetails;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
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
