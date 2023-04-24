import { Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  CreateOrdertDto,
  UpdateProductDto,
  UpdateProvidertDto,
  CreateProvidertDto,
  OrderDetailsDto,
} from './dto';

import { Model, Types } from 'mongoose';
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

  // =================================== AREA DE TRABAJO PARA PROVIDER ===================================

  // Metodo para crear un provider
  async createProvider(createProviderDto: CreateProvidertDto) {
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

  // Metodo para obtener todos los providers
  async findAllProviders() {
    return await this.ProvidersModel.find();
  }

  // Metodo para obtener un provider por id
  async findOneProvider(id: string) {
    const provider = await this.ProvidersModel.findById(id);
    return provider;
  }

  // Metodo para actualizar un provider por id
  async updateProvider(id: string, updateProviderDto: UpdateProvidertDto) {
    const ProviderID_UP = await this.ProvidersModel.findByIdAndUpdate(
      id,
      updateProviderDto,
      { new: true },
    );
    // Notificamos por consola
    console.log('updateProvider by id');
    console.log('ID QUE LLEGO: ', id);
    return ProviderID_UP;
  }

  // Metodo para eliminar un provider por id
  async deleteProvider(id: string) {
    const ProviderID_DEL = await this.ProvidersModel.findByIdAndDelete(id);
    // Notificamos por consola
    console.log('deleteProvider by id');
    console.log('ID QUE LLEGO: ', id);
    return ProviderID_DEL;
  }

  // =================================== AREA DE TRABAJO PARA PRODUCT ===================================

  // Metodo para crear un producto
  async createProduct(createProductDto: CreateProductDto) {
    try {
      const createdProduct = await this.productModel.create(createProductDto);
      return createdProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Metodo para obtener todos los productos
  async findAllProducts() {
    return await this.productModel.find();
  }

  // Metodo para obtener un producto por id
  async findOneProduct(id: string) {
    const product = await this.productModel.findById(id);
    return product;
  }

  // Metodo para actualizar un producto por id
  async update(id: string, updateProductDto: UpdateProductDto) {
    const ProductID_UP = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    // Notificamos por consola
    console.log('updateProduct by id');
    console.log('ID QUE LLEGO', id);
    return ProductID_UP;
  }

  // Metodo para eliminar un producto por id
  async remove(id: string) {
    const ProductID_DEL = await this.productModel.findByIdAndDelete(id);
    // Notificamos por consola
    console.log('deleteProduct by id');
    console.log('ID QUE LLEGO SERVICES', id);
    return ProductID_DEL;
  }

  // =================================== AREA DE TRABAJO PARA B_ORDERS ===================================

  // Metodo para crear un borderheader y borderdetails
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
      // this.connection.close();
      // to abort the transaction
      // this.connection.abortTransaction();
      return {
        orderHeader: orderHeaderModel,
        details: detailsDB,
      };
    } catch (error) {
      // this.connection.close();
      console.log(error);
      return error;
    }
  }

  // Metodo para obtener bordersheaders
  async findAllBOrdersHeaders() {
    return await this.OrdersHeaderModel.find();
  }

  // Metodo para obtener bordersheaders por id
  async findOneBOrdersHeaders(id: string) {
    const bOrderHeader = await this.OrdersHeaderModel.findById(id);
    return bOrderHeader;
  }

  // Metodo para obtener bordersdetails
  async findAllBOrdersDetails() {
    return await this.OrdersDetailsModel.find();
  }

  // Metodo para obtener bordersdetails por id
  async findOneBOrdersDetails(id: string) {
    const bOrdersDetails = await this.OrdersDetailsModel.findById(id);
    return bOrdersDetails;
  }

  // Metodo para buscar un borderdetails por ID_Header de bordersheaders
  async getBOrdersDetailsByBOrdH(id: string) {
    const bOrdersDetails = await this.OrdersDetailsModel.find({
      ID_Header: new Types.ObjectId(id),
    });
    // notificamos por consola
    console.log('searchBOrdersDetailsByPId by id');
    console.log('ID QUE LLEGO SSS', id);
    return bOrdersDetails;
  }

  // Ruta para eliminar en cascada bordersheaders y bordersdetails por id
  async deleteBOrdersHeadersCascade(id: string) {
    const bOrdersHeaders = await this.OrdersHeaderModel.findByIdAndDelete(id);
    const F_ID_Header = new Types.ObjectId(id);
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

  // Metodo para eliminar bordersdetails por id
  async deleteBOrdersDetails(id: string) {
    const bOrdersDetails = await this.OrdersDetailsModel.findByIdAndDelete(id);
    // notificamos por consola
    console.log('deleteBOrdersDetails by id');
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
