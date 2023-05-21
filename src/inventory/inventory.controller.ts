import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import {
  CreateRecipeDto,
  CreateStockDto,
  UpdateStockDto,
  UpdateRecipeStockDto,
  CreateRecipeDetailDto,
} from './dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  //inventory recipes
  @Get('recipes')
  findAllRecipes() {
    return this.inventoryService.findAllRecipes();
  }

  // @Get('recipes/:id')
  // findOneRecipe(@Param('id') id: string) {
  //   return this.inventoryService.getRecipe(id);
  // }

  // Ruta para obtener un recipeheader por id
  @Get('recipesh/:id')
  async findOneRecipeHeader(@Param('id') id: string) {
    // Validar si el recipeheader existe
    const recipeheaderID = await this.inventoryService.findOneRecipeHeader(id);
    if (!recipeheaderID)
      throw new NotFoundException(
        'C- Recipeheader ID for search does not exist!',
      );
    return recipeheaderID;
  }

  // Ruta para crear un recipedetails dentro de un recipeheader por medio del idheader
  // @Post('recipes/buy/:id')
  // async createRecipeDetail(
  //   @Param('id') id: string,
  //   @Body() createRecipeDetailDto: CreateRecipeDetailDto,
  // ) {
  //   const createdRecipeDetail = await this.inventoryService.createRecipeDetail(
  //     id,
  //     createRecipeDetailDto,
  //   );
  //   return createdRecipeDetail;
  // }

  // Ruta para actualizar el stock del recipeheader cuando sea mayor o igual al pedido por id
  // @Patch('recipes/updstock/:id/stock')
  // async updateRecipeStock(
  //   @Param('id') id: string,
  //   @Body() updateRecipeStockDto: UpdateRecipeStockDto,
  // ) {
  //   const { stock } = updateRecipeStockDto;

  //   // Validar si el recipeheader existe
  //   const recipeheaderID = await this.inventoryService.findOneRecipeHeader(id);
  //   if (!recipeheaderID) {
  //     throw new NotFoundException('Recipe header ID does not exist!');
  //   }

  //   // Verificar si el stock actual es mayor o igual al stock proporcionado
  //   if (recipeheaderID.Stock < stock) {
  //     throw new BadRequestException('Insufficient stock!');
  //   }

  //   // Restar el stock existente con el stock proporcionado
  //   const updatedStock = recipeheaderID.Stock - stock;

  //   // Actualizar el stock de la receta
  //   const updatedRecipe = await this.inventoryService.updateRecipeStock(
  //     id,
  //     updatedStock,
  //   );
  //   return updatedRecipe;

  //   // console.log('Lo que encontre', recipeheaderID);
  //   // console.log('Lo que envio', updateRecipeStockDto);
  //   // console.log('Lo que envio st: ', stock);
  //   // console.log('aaaaaaa');
  //   // console.log('Lo que envio upd: ', updatedStock);
  // }

  // ===================

  // Ruta para crear un RecipeDetail dentro de un RecipeHeader por medio del id del header y actualizar el stock si es suficiente
  @Post('recipes/buy/:id')
  async createRecipeDetailAndUpdateStock(
    @Param('id') id: string,
    @Body() createRecipeDetailDto: CreateRecipeDetailDto,
  ) {
    const { quantity } = createRecipeDetailDto;

    // Validar si el recipeheader existe
    const recipeheaderID = await this.inventoryService.findOneRecipeHeader(id);
    if (!recipeheaderID) {
      throw new NotFoundException('Recipe header ID does not exist!');
    }

    // Verificar si el stock actual es mayor o igual al stock proporcionado
    if (recipeheaderID.Stock < quantity) {
      throw new BadRequestException('Insufficient stock!');
    }

    // Restar el stock existente con la cantidad proporcionada
    const updatedStock = recipeheaderID.Stock - quantity;

    // Crear el RecipeDetail
    const createdRecipeDetail = await this.inventoryService.createRecipeDetail(
      id,
      createRecipeDetailDto,
    );

    // Actualizar el stock del RecipeHeader
    const updatedRecipe = await this.inventoryService.updateRecipeStock(
      id,
      updatedStock,
    );

    return {
      recipeDetail: createdRecipeDetail,
      updatedRecipe,
    };
  }

  // =====================

  @Post('recipes')
  createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    console.log(createRecipeDto);
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
