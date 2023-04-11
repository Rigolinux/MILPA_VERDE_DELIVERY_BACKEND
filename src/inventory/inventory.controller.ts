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
import { CreateRecipeDto } from './dto/create-recipe.dto';

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
}
