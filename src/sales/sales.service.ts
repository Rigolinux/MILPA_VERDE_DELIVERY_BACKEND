import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateSalesHeaderDto, UpdateSaleDto } from './dto';
import { CreateSalesHeaderDto } from './dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SalesHeader, SalesDetails } from './entities';
import { InventoryService } from 'src/inventory/inventory.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(SalesHeader.name)
    private readonly SalesHeaderModel: Model<SalesHeader>,
    @InjectModel(SalesDetails.name)
    private readonly SalesDetailsModel: Model<SalesDetails>,
    private readonly inventoryService: InventoryService,
  ) {}

  // Metodo para crear un sale
  async createSale(createSaleDto: CreateSalesHeaderDto) {
    const { details, ...SalesHeader } = createSaleDto;
    const sale = await this.SalesHeaderModel.create(SalesHeader);

    const SalesDetails = details.map((detail) => ({
      ...detail,
      ID_sale: sale._id,
    }));
    const arrayDetails = [];
    const arrayUpdate = [];
    for (let i = 0; i < SalesDetails.length; i++) {
      const detail = await this.SalesDetailsModel.create(SalesDetails[i]);
      this.inventoryService.updateRecipeStock(
        SalesDetails[i].ID_recipe,
        SalesDetails[i].quantity,
      );
      //logica de actualizar aqui

      // hasta aqui la logica de actualizar
      arrayDetails.push(detail);
    }
    const dbDetails = await Promise.all(arrayDetails);
    return {
      saleHeader: sale,
      details: dbDetails,
    };
  }

  // Metodo para obtener todos los salesHeaders
  async findAllSales() {
    return await this.SalesHeaderModel.find();
  }

  // Metodo para obtener todos los salesDetails
  async findAllSalesDetails() {
    return await this.SalesDetailsModel.find();
  }

  // Metodo para obtener un saleHeader por id
  async findOneSale(id: string) {
    try {
      const ObjectId = Types.ObjectId;
      const salesHeader = await this.SalesHeaderModel.findById({
        _id: new ObjectId(id),
        // ID_USER: new ObjectId(id),
      });
      return salesHeader;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Metodo para obtener un saleDetail por id
  async findOneSaleDetail(id: string) {
    try {
      const ObjectId = Types.ObjectId;
      const salesDetail = await this.SalesDetailsModel.findById({
        _id: new ObjectId(id),
      });
      return salesDetail;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Metodo para buscar un saleDetail por ID_Header de salesheaders
  async getSaleDetailsBySH_IS(id: string) {
    try {
      const salesDetails = await this.SalesDetailsModel.find({
        ID_sale: new Types.ObjectId(id),
      });
      // notificacion por consola
      console.log('ID QUE LLEGO: ', id);
      return salesDetails;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Metodo para obtener los sales de SalesHeaders por ID_USER
  async getSalesByUser(id: string) {
    try {
      const sales = await this.SalesHeaderModel.find({
        ID_USER: new Types.ObjectId(id),
      });
      return sales;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Ruta para eliminar en cascada SalesHeaders y SalesDetails por id
  async deleteSalesHeadersAndDetails(id: string) {
    const SalesHeader = await this.SalesHeaderModel.findByIdAndDelete(id);
    const F_ID_Header = new Types.ObjectId(id);
    const SalesDetails = await this.SalesDetailsModel.deleteMany({
      ID_sale: F_ID_Header,
    });
    // notificacion por consola de los datos eliminados
    console.log('SalesHeader: ', SalesHeader);
    console.log('SalesDetails: ', SalesDetails);
    if (!SalesHeader && !SalesDetails) {
      throw new NotFoundException('SalesHeader or SalesDetails not found');
    } else if (!SalesHeader) {
      throw new NotFoundException('SalesHeader not found');
    } else if (!SalesDetails) {
      throw new NotFoundException('SalesDetails not found');
    }
    return { SalesHeader, SalesDetails };
  }
}
