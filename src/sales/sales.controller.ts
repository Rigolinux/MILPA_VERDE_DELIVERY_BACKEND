import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSalesHeaderDto, UpdateSaleDto } from './dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSalesHeaderDto) {
    return this.salesService.createSale(createSaleDto);
  }

  @Get()
  findAll() {
    return this.salesService.findAllSales();
  }

  @Get('customer/:id')
  findAllByCustomer(@Param('id') id: string) {
    return this.salesService.findAllSalesByCustomer(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOneSale(id);
  }

  /*  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  } */
}
