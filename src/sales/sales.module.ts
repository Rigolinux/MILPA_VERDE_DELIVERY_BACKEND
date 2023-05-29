import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

//Import document from mongoose
import { MongooseModule } from '@nestjs/mongoose';
import {
  SalesHeader,
  SalesHeaderSchema,
  SalesDetails,
  SalesDetailsSchema,
} from './entities/';
import { InventoryModule } from 'src/inventory/inventory.module';
import { InventoryService } from 'src/inventory/inventory.service';
import {
  RecipeHeader,
  RecipeHeaderSchema,
  RecipeDetails,
  RecipeDetailsSchema,
  Stock,
  StockSchema,
} from 'src/inventory/entities';

@Module({
  imports: [
    InventoryModule,
    MongooseModule.forFeature([
      { name: SalesHeader.name, schema: SalesHeaderSchema },
      { name: SalesDetails.name, schema: SalesDetailsSchema },
      { name: RecipeHeader.name, schema: RecipeHeaderSchema },
      { name: RecipeDetails.name, schema: RecipeDetailsSchema },
      { name: Stock.name, schema: StockSchema },
    ]),
  ],
  controllers: [SalesController],
  providers: [SalesService, InventoryService],
})
export class SalesModule {}
