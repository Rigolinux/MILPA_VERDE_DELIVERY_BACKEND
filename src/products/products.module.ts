import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

// product db config
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './entities/product.entity';
import {
  BOrdersHeader,
  BOrdersHeaderSchema,
} from './entities/BOrdersHeader.entity';
import {
  BOrdersDetails,
  BOrdersDetailsSchema,
} from './entities/BOrdersDetails.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductsSchema },
      { name: BOrdersHeader.name, schema: BOrdersHeaderSchema },
      { name: BOrdersDetails.name, schema: BOrdersDetailsSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
