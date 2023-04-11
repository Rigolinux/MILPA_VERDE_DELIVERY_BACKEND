import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Agregados
  Res,
  //Query,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
// add is uuid validation

import { ProductsService } from './products.service';
import {
  CreateProductDto,
  CreateOrdertDto,
  UpdateProductDto,
  CreateProvidertDto,
  OrderDetailsDto,
} from './dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // products api rest

  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }
  @Get('product/:id')
  findOneProduct(@Param('id') id: string) {
    return this.productsService.findOneProduct(id);
  }

  @Post('product')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  // orders api rest
  @Post('order')
  create(@Body() createOrdertDto: CreateOrdertDto) {
    return this.productsService.createOrder(createOrdertDto);
  }

  /*  @Get()
  findAll() {
    return this.productsService.findAll();
  } */

  /*  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  } */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  //providers
  @Get('provider')
  findAllProviders() {
    return this.productsService.findAllProviders();
  }
  @Get('provider/:id')
  findOneProvider(@Param('id') id: string) {
    return this.productsService.findOneProvider(id);
  }
  @Post('provider')
  createProvider(@Body() createProviderDto: CreateProvidertDto) {
    return this.productsService.creaateProvider(createProviderDto);
  }

  // =================================== AREA DE TRABAJO DE KIDITO =================================== 

  // Ruta para obtener bordersheaders
  @Get('bordersheaders')
  async findAllBOrdersHeaders() {
    return await this.productsService.findAllBOrdersHeaders();
  }

  // Ruta para obtener bordersheaders por id
  @Get('bordersheaders/:id')
  async findOneBOrdersHeaders(@Param('id') id: string) {
    return await this.productsService.findOneBOrdersHeaders(id);
  }

  // Ruta para obtener bordersdetails
  @Get('bordersdetails')
  async findAllBOrdersDetails() {
    return await this.productsService.findAllBOrdersDetails();
  }

  // Ruta para obtener bordersdetails por id
  @Get('bordersdetails/:id')
  async findOneBOrdersDetails(@Param('id') id: string) {
    return await this.productsService.findOneBOrdersDetails(id);
  }

  // Ruta para buscar un borderdetails por ID_Header de bordersheaders
  @Get('bordersdetails/getbOrdH/:idbOrdH')
  async getBOrdersDetailsByBOrdH(@Param('idbOrdH') idbOrdH: string) {
    return await this.productsService.getBOrdersDetailsByBOrdH(idbOrdH);
  }

  // // Ruta para eliminar bordersheaders por id
  // @Delete('bordersheaders/delete/:id')
  // async deleteBOrdersHeaders(@Param('id') id: string) {
  //   return await this.productsService.deleteBOrdersHeaders(id);
  // }

  // Ruta para eliminar en cascada bordersheaders y bordersdetails por id
  @Delete('bordersheaders/deletecascade/:idheaders')
  async deleteBOrdersHeadersCascade(@Param('idheaders') idheaders: string) {
    return await this.productsService.deleteBOrdersHeadersCascade(idheaders);
  }

  // Ruta para eliminar bordersdetails por id
  @Delete('bordersdetails/delete/:id')
  async deleteBOrdersDetails(@Param('id') id: string) {
    return await this.productsService.deleteBOrdersDetails(id);
  }

  // Ruta para actualizar bordersheaders por id
  @Patch('bordersheaders/update/:id')
  async updateBOrdersHeaders(
    @Res() res,
    @Body() updateBOrdersHeadersDto: CreateOrdertDto,
    @Param('id') id: string,
  ) {
    const updatedbordersheaders =
      await this.productsService.updateBOrdersHeaders(
        id,
        updateBOrdersHeadersDto,
      );
    // Validando si no existe el id
    if (!updatedbordersheaders) throw new NotFoundException('No existe el id');
    return res.status(HttpStatus.OK).json({
      message: 'El registro ha sido actualizado correctamente',
      updatedbordersheaders,
    });
  }
  // Ruta para actualizar bordersdetails por id
  @Patch('bordersdetails/update/:id')
  async updateBOrdersDetails(
    @Res() res,
    @Body() updateBOrdersDetailsDto: OrderDetailsDto,
    @Param('id') id: string,
  ) {
    const updatedbordersdetails =
      await this.productsService.updateBOrdersDetails(
        id,
        updateBOrdersDetailsDto,
      );
    // Validando si no existe el id
    if (!updatedbordersdetails) throw new NotFoundException('No existe el id');
    return res.status(HttpStatus.OK).json({
      message: 'El registro ha sido actualizado correctamente',
      updatedbordersdetails,
    });
  }
}
