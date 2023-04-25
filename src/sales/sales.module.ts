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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SalesHeader.name, schema: SalesHeaderSchema },
      { name: SalesDetails.name, schema: SalesDetailsSchema },
    ]),
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
