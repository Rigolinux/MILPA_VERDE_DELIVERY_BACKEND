import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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

  // Ruta para eliminar en cascada SalesHeaders y SalesDetails por id
  @Delete('deleteSales/:id')
  async deleteSalesHeadersAndDetails(@Param('id') id: string) {
    return await this.salesService.deleteSalesHeadersAndDetails(id);
  }

  // Ruta para obtener un saleheader por ID_USER de salesheaders
  @Get('salesHeaders/history/:id')
  async getSaleHistory(@Param('id') id: string) {
    // Validar si el ID_User existe en salesHeaders
    const ID_user = await this.salesService.getSaleHistory(id);
    if (!ID_user || ID_user.length === 0)
      throw new NotFoundException(
        'C- ID_User for search does not exist in SalesHeaders!',
      );
    return ID_user;
  }

  // Ruta para eliminar un saleheader por ID_USER de salesheaders
  @Delete('salesHeaders/history/delete/:id')
  async deleteSaleHistory(@Param('id') id: string) {
    // Validar si el ID_User existe en salesHeaders
    const ID_user = await this.salesService.deleteSaleHistory(id);
    if (!ID_user)
      throw new NotFoundException(
        'C- ID_User for search does not exist in SalesHeaders!',
      );
    return ID_user;
  }

  // Ruta para eliminar un saleheader por _id de salesheaders
  @Delete('salesHeaders/history/del/:id')
  async deleteSaleHistoryBy_id(@Param('id') id: string) {
    // Validar si el id saleheader existe en salesHeaders
    const idHeader = await this.salesService.deleteSaleHistoryBy_id(id);
    if (!idHeader)
      throw new NotFoundException(
        'C- _id for search does not exist in SalesHeaders!',
      );
    return idHeader;
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
