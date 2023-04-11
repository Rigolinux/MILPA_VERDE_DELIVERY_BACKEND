import { Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  CreateOrdertDto,
  UpdateProductDto,
  CreateProvidertDto,
  OrderDetailsDto,
} from './dto';

import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BOrdersDetails,
  BOrdersHeader,
  Products,
  Providers,
} from './entities/';

// transaction of mongoose
import { InjectConnection } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';
// import { Connection, Types, ObjectId } from 'mongoose';
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
    @InjectModel(Providers.name)
    private readonly ProvidersModel: Model<Providers>,
  ) {}

  //Products api rest

  async findAllProducts() {
    return await this.productModel.find();
  }

  async findOneProduct(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  //Orders api rest

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
  //providers api rest

  async creaateProvider(createProviderDto: CreateProvidertDto) {
    try {
      const createdProvider = await this.ProvidersModel.create(
        createProviderDto,
      );
      return createdProvider;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAllProviders() {
    console.log('findAllProviders');
    return await this.ProvidersModel.find();
  }

  async findOneProvider(id: string) {
    const provider = await this.ProvidersModel.findById(id);
    if (!provider) throw new NotFoundException('Provider not found');
    return provider;
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

  // =================================== AREA DE TRABAJO DE KIDITO ===================================

  // Metodo para obtener bordersheaders
  async findAllBOrdersHeaders() {
    return await this.OrdersHeaderModel.find();
  }

  // Metodo para obtener bordersheaders por id
  async findOneBOrdersHeaders(id: string) {
    const bOrderHeader = await this.OrdersHeaderModel.findById(id);
    if (!bOrderHeader) throw new NotFoundException('BOrderHeader not found');
    return bOrderHeader;
  }

  // Metodo para obtener bordersdetails
  async findAllBOrdersDetails() {
    return await this.OrdersDetailsModel.find();
  }

  // Metodo para obtener bordersdetails por id
  async findOneBOrdersDetails(id: string) {
    const bOrdersDetails = await this.OrdersDetailsModel.findById(id);
    if (!bOrdersDetails)
      throw new NotFoundException('BOrdersDetails not found');
    return bOrdersDetails;
  }

  // Metodo para buscar un borderdetails por ID_Header de bordersheaders
  async getBOrdersDetailsByBOrdH(id: string) {
    const bOrdersDetails = await this.OrdersDetailsModel.find({
      ID_Header: new mongoose.Types.ObjectId(id),
    });
    // notificamos por consola
    console.log('searchBOrdersDetailsByPId by id');
    if (!bOrdersDetails)
      throw new NotFoundException('BOrdersDetails not found');
    return bOrdersDetails;
  }

  // Ruta para eliminar en cascada bordersheaders y bordersdetails por id
  async deleteBOrdersHeadersCascade(id: string) {
    const bOrdersHeaders = await this.OrdersHeaderModel.findByIdAndDelete(id);
    const F_ID_Header = new mongoose.Types.ObjectId(id);
    const bOrdersDetails = await this.OrdersDetailsModel.deleteMany({
      ID_Header: F_ID_Header,
    });
    // notificamos por consola
    console.log('bOrdersHeaders: ', bOrdersHeaders);
    console.log('bOrdersDetails: ', bOrdersDetails);
    if (!bOrdersHeaders && !bOrdersDetails) {
      throw new NotFoundException('bOrdersHeader and bOrdersDetail not found');
    } else if (!bOrdersHeaders) {
      throw new NotFoundException('bOrdersHeaders not found');
    } else if (!bOrdersDetails) {
      throw new NotFoundException('bOrdersDetails not found');
    }
    return { bOrdersHeaders, bOrdersDetails };
  }

  // // Metodo para eliminar bordersheaders por id
  // async deleteBOrdersHeaders(id: string) {
  //   const bOrderHeader = await this.OrdersHeaderModel.findByIdAndDelete(id);
  //   // notificamos por consola
  //   console.log('deleteBOrdersHeaders by id');
  //   if (!bOrderHeader) throw new NotFoundException('BOrderHeader not found');
  //   return bOrderHeader;
  // }

  // Metodo para eliminar bordersdetails por id
  async deleteBOrdersDetails(id: string) {
    const bOrdersDetails = await this.OrdersDetailsModel.findByIdAndDelete(id);
    // notificamos por consola
    console.log('deleteBOrdersDetails by id');
    if (!bOrdersDetails)
      throw new NotFoundException('BOrdersDetails not found');
    return bOrdersDetails;
  }

  // Metodo para actualizar bordersheaders por id
  async updateBOrdersHeaders(
    id: string,
    updateBOrdersHeadersDto: CreateOrdertDto,
  ) {
    const bOrdersHeaders = await this.OrdersHeaderModel.findByIdAndUpdate(
      id,
      updateBOrdersHeadersDto,
      { new: true },
    );
    // notificamos por consola
    console.log('updateBOrdersHeaders by id');
    console.log('ID QUE LLEGO', id);
    return bOrdersHeaders;
  }
  // Metodo para actualizar bordersdetails por id
  async updateBOrdersDetails(
    id: string,
    updateBOrdersDetailsDto: OrderDetailsDto,
  ) {
    const bOrdersDetails = await this.OrdersDetailsModel.findByIdAndUpdate(
      id,
      updateBOrdersDetailsDto,
      { new: true },
    );
    // notificamos por consola
    console.log('updateBOrdersDetails by id');
    console.log('ID QUE LLEGO', id);
    return bOrdersDetails;
  }
}
