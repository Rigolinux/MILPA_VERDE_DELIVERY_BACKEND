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
  CreateProvidertDto,
  UpdateProductDto,
  UpdateProvidertDto,
  OrderDetailsDto,
} from './dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // =================================== AREA DE TRABAJO PARA PROVIDER ===================================

  // Ruta para crear un provider
  @Post('provider')
  async createProvider(@Body() createProviderDto: CreateProvidertDto) {
    return await this.productsService.createProvider(createProviderDto);
  }

  // Ruta para obtener todos los providers
  @Get('provider')
  async findAllProviders() {
    return await this.productsService.findAllProviders();
  }

  // Ruta para obtener un provider por id
  @Get('provider/:id')
  async findOneProvider(@Param('id') id: string) {
    // Validar si el provider existe
    const providerID = await this.productsService.findOneProvider(id);
    if (!providerID)
      throw new NotFoundException('C- Provider ID for search does not exist!');
    return providerID;
  }

  // Ruta para actualizar un provider por id
  @Patch('provider/:id')
  async updateProvider(
    @Res() res,
    @Body() updateProviderDto: UpdateProvidertDto,
    @Param('id') id: string,
  ) {
    const updateProvider = await this.productsService.updateProvider(
      id,
      updateProviderDto,
    );
    // Validar si el provider existe
    if (!updateProvider)
      throw new NotFoundException('C- Provider ID for Update does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'C- Provider has been successfully updated',
      updateProvider,
    });
  }

  // Ruta para eliminar un provider por id
  @Delete('provider/:id')
  async deleteProvider(@Res() res, @Param('id') id: string) {
    const providerID = await this.productsService.deleteProvider(id);
    // Validar si el provider existe
    if (!providerID)
      throw new NotFoundException('C- Provider ID for deleted does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'C- Provider has been deleted',
      providerID,
    });
  }

  // =================================== AREA DE TRABAJO PARA PRODUCTS ===================================

  // Ruta para crear un producto
  @Post('product')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.createProduct(createProductDto);
  }

  // Ruta para obtener todos los productos
  @Get()
  async findAllProducts() {
    return await this.productsService.findAllProducts();
  }

  // Ruta para obtener un producto por id
  @Get('product/:id')
  async findOneProduct(@Param('id') id: string) {
    // Validar si el producto existe
    const productID = await this.productsService.findOneProduct(id);
    if (!productID)
      throw new NotFoundException('C- Product ID for search does not exist!');
    return productID;
  }

  // Ruta para actualizar un producto por id
  @Patch('product/:id')
  async update(
    @Res() res,
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ) {
    const updateProduct = await this.productsService.update(
      id,
      updateProductDto,
    );
    // Validar si el producto existe
    if (!updateProduct)
      throw new NotFoundException('C- Product ID for Update does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'C- Product has been successfully updated',
      updateProduct,
    });
  }

  // Ruta para eliminar un producto por id
  @Delete('product/:id')
  async remove(@Res() res, @Param('id') id: string) {
    const deleteProduct = await this.productsService.remove(id);
    // Validar si el producto existe
    if (!deleteProduct)
      throw new NotFoundException('C- Product ID for delete does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'C- Product has been successfully deleted',
      deleteProduct,
    });
  }

  // =================================== AREA DE TRABAJO PARA B_ORDERS ===================================

  // Ruta para crear un borderheader y borderdetail
  @Post('order')
  create(@Body() createOrdertDto: CreateOrdertDto) {
    return this.productsService.createOrder(createOrdertDto);
  }


  /*  @Get('order/:id')
  findOneOrder(@Param('id') id: string) {
    return this.productsService.findOrderDetails(id);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  } */

  // Ruta para obtener bordersheaders
  @Get('bordersheaders')
  async findAllBOrdersHeaders() {
    return await this.productsService.findAllBOrdersHeaders();
  }


  // Ruta para obtener bordersheaders por id
  @Get('bordersheaders/:id')
  async findOneBOrdersHeaders(@Param('id') id: string) {
    // Validar si el borderheader existe
    const borderHeaderID = await this.productsService.findOneBOrdersHeaders(id);
    if (!borderHeaderID)
      throw new NotFoundException(
        'C- BorderHeader ID for search does not exist!',
      );
    return borderHeaderID;
  }

  // Ruta para obtener bordersdetails
  @Get('bordersdetails')
  async findAllBOrdersDetails() {
    return await this.productsService.findAllBOrdersDetails();
  }

  // Ruta para obtener bordersdetails por id
  @Get('bordersdetails/:id')
  async findOneBOrdersDetails(@Param('id') id: string) {
    // Validar si el borderdetail existe
    const borderDetailID = await this.productsService.findOneBOrdersDetails(id);
    if (!borderDetailID)
      throw new NotFoundException(
        'C- BorderDetail ID for search does not exist!',
      );
    return borderDetailID;
  }

  // Ruta para buscar un borderdetails por ID_Header de bordersheaders
  @Get('bordersdetails/getbOrdH/:idbOrdH')
  async getBOrdersDetailsByBOrdH(@Param('idbOrdH') idbOrdH: string) {
    console.log('idbOrdH aaaaaaa', idbOrdH);
    // Validar si el borderheader existe en bordersdetails
    const borderHeaderID = await this.productsService.getBOrdersDetailsByBOrdH(
      idbOrdH,
    );
    if (!borderHeaderID || borderHeaderID.length === 0)
      throw new NotFoundException(
        'C- BorderHeader ID for search does not exist!',
      );
    return borderHeaderID;
  }

  // Ruta para eliminar en cascada bordersheaders y bordersdetails por id
  @Delete('bordersheaders/deletecascade/:idheaders')
  async deleteBOrdersHeadersCascade(@Param('idheaders') idheaders: string) {
    return await this.productsService.deleteBOrdersHeadersCascade(idheaders);
  }

  // Ruta para eliminar bordersdetails por id
  @Delete('bordersdetails/delete/:id')
  async deleteBOrdersDetails(@Res() res, @Param('id') id: string) {
    const deleteBOrdersDetails =
      await this.productsService.deleteBOrdersDetails(id);
    // Validando si borderdetails id existe
    if (!deleteBOrdersDetails)
      throw new NotFoundException('C- BorderDetail ID does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'C- BorderDetail has been successfully deleted',
      deleteBOrdersDetails,
    });
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
