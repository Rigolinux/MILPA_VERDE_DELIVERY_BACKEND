import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { SalesService } from './sales.service';
// import { CreateSalesHeaderDto, UpdateSaleDto } from './dto';
import { CreateSalesHeaderDto } from './dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  // =================================== AREA DE TRABAJO PARA SALES ===================================

  // Ruta para crear un sale
  @Post('saleCreate')
  create(@Body() createSaleDto: CreateSalesHeaderDto) {
    return this.salesService.createSale(createSaleDto);
  }

  // Ruta para obtener todos los salesHeaders
  @Get('salesHeaders')
  async findAllSales() {
    return await this.salesService.findAllSales();
  }

  // Ruta para obtener todos los salesDetails
  @Get('salesDetails')
  async findAllSalesDetails() {
    return await this.salesService.findAllSalesDetails();
  }

  // Ruta para obtener un sale por id de salesHeaders
  @Get('findSalesHeaders/:id')
  async findOneSale(@Param('id') id: string) {
    // Validar si el saleheader existe
    const saleHeaderID = await this.salesService.findOneSale(id);
    if (!saleHeaderID)
      throw new NotFoundException(
        'C- SaleHeader ID for search does not exist!',
      );
    return saleHeaderID;
  }

  // Ruta para obtener un sale por id de salesDetails
  @Get('findSalesDetails/:id')
  async findOneSaleDetail(@Param('id') id: string) {
    // Validar si el saleDetail existe
    const saleDetailID = await this.salesService.findOneSaleDetail(id);
    if (!saleDetailID)
      throw new NotFoundException(
        'C- SaleDetail ID for search does not exist!',
      );
    return saleDetailID;
  }

  // Ruta para obtener un saleDetail por ID_Header de salesheaders
  @Get('salesDetails/searchbyIDSale/:id')
  async getSaleDetailsBySH_IS(@Param('id') id: string) {
    // Validar si el ID_Sale existe en salesDetails
    const ID_sale = await this.salesService.getSaleDetailsBySH_IS(id);
    if (!ID_sale || ID_sale.length === 0)
      throw new NotFoundException(
        'C- ID_Sale for search does not exist in SalesDetails!',
      );
    return ID_sale;
  }

  // Ruta para obtener un sale por ID_USER de salesheaders
  @Get('salesHeaders/searchbyIDUser/:id')
  async getSalesByUser(@Param('id') id: string) {
    // Validar si el ID_User existe en salesHeaders
    const ID_user = await this.salesService.getSalesByUser(id);
    if (!ID_user || ID_user.length === 0)
      throw new NotFoundException(
        'C- ID_User for search does not exist in SalesHeaders!',
      );
    return ID_user;
  }

  // Ruta para obtener los sales de SalesDetais por el dateOfbuy
  @Get('salesDetails/searchbyDateOfBuy/:dateOfBuy')
  async getSalesByDate(@Param('dateOfBuy') dateOfBuy: string) {
    // Validar si el dateOfBuy existe en salesDetails
    const date = await this.salesService.getSalesByDate(dateOfBuy);
    if (!date || date.length === 0)
      throw new NotFoundException(
        'C- DateOfBuy for search does not exist in SalesDetails!',
      );
    return date;
  }

  // Ruta para obtener los salesDetails que tengan la misma fecha en el dateOfBuy
  @Get('salesDetails/searchbyDateOfBuy3/:dateOfBuy')
  async getSalesDetailsByDate3(@Param('dateOfBuy') dateOfBuy: string) {
    // Validar si el dateOfBuy existe en salesDetails
    const date = await this.salesService.getSalesDetailsByDate3(dateOfBuy);
    if (!date || date.length === 0)
      throw new NotFoundException(
        'C- DateOfBuy for search does not exist in SalesDetails!',
      );
    return date;
  }

  // Ruta  para obtener el saleDetail que tenga la misma fecha en el dateOfBuy
  @Get('salesDetails/searchbyDateOfBuy0/:dateOfBuy')
  async getSalesDetailsByDate2(@Param('dateOfBuy') dateOfBuy: string) {
    // Validar si el dateOfBuy existe en salesDetails
    const date = await this.salesService.getSalesDetailsByDate2(dateOfBuy);
    if (!date)
      throw new NotFoundException(
        'C- DateOfBuy for search does not exist in SalesDetails!',
      );
    return date;
  }

  // Ruta para obtener UNICAMENTE los salesDetails que tengan la misma fecha en dateOfBuy
  @Get('salesDetails/searchbyDateOfBuy999/:month')
  async abc(@Param('month') month: string) {
    // Validando que retorne unicamente los salesDetails que tengan la misma fecha en dateOfBuy
    const date = await this.salesService.abc(month);
    if (!date || date.length === 0)
      throw new NotFoundException(
        'C- DateOfBuy for search does not exist in SalesDetails!',
      );
    return date;
  }

  // Ruta para eliminar en cascada SalesHeaders y SalesDetails por id
  @Delete('deleteSales/:id')
  async deleteSalesHeadersAndDetails(@Param('id') id: string) {
    return await this.salesService.deleteSalesHeadersAndDetails(id);
  }

  // @Get('customer/:id')
  // findAllByCustomer(@Param('id') id: string) {
  //   return this.salesService.findAllSalesByCustomer(id);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.salesService.findOneSale(id);
  // }

  /*  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  } */
}
