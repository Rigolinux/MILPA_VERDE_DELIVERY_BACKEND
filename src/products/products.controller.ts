import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
// add is uuid validation

import { ProductsService } from './products.service';
import {
  CreateProductDto,
  CreateOrdertDto,
  UpdateProductDto,
  CreateProvidertDto,
} from './dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // products api rest

  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }
  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productsService.findOneProduct(id);
  }

  @Post()
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

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
}
