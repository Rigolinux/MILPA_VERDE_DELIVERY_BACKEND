import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateRecipeDto, CreateStockDto, UpdateStockDto } from './dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  //inventory recipes
  @Get('recipes')
  findAllRecipes() {
    return this.inventoryService.findAllRecipes();
  }

  @Get('recipes/:id')
  findOneRecipe(@Param('id') id: string) {
    return this.inventoryService.getRecipe(id);
  }

  @Post('recipes')
  createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    return this.inventoryService.createRecipe(createRecipeDto);
  }

  //stock
  @Get('stock')
  findAllStock() {
    return this.inventoryService.findAllStock();
  }
  @Post('stock')
  createStock(@Body() createStockDto: CreateStockDto) {
    return this.inventoryService.createStock(createStockDto);
  }

  @Get('stock/:id')
  findOneStock(@Param('id') id: string) {
    return this.inventoryService.getStock(id);
  }

  @Patch('stock/:id')
  updateStock(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.inventoryService.updateStock(id, updateStockDto);
  }

  @Delete('stock/:id')
  removeStock(@Param('id') id: string) {
    return this.inventoryService.deleteStock(id);
  }
}
