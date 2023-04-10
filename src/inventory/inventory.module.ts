import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

import { MongooseModule } from '@nestjs/mongoose';

import {
  RecipeHeader,
  RecipeHeaderSchema,
  RecipeDetails,
  RecipeDetailsSchema,
} from './entities/';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecipeHeader.name, schema: RecipeHeaderSchema },
      { name: RecipeDetails.name, schema: RecipeDetailsSchema },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
