import { Injectable } from '@nestjs/common';
import { CreateInventoryDto, CreateRecipeDto } from './dto/';

import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { RecipeHeader, RecipeDetails } from './entities/';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(RecipeHeader.name)
    private readonly recipeHeaderModel: Model<RecipeHeader>,
    @InjectModel(RecipeDetails.name)
    private readonly recipeDetailsModel: Model<RecipeDetails>,
  ) {}

  createRecipe(createRecipeDto: CreateRecipeDto) {
    const recipeHeader = new this.recipeHeaderModel(createRecipeDto);
    const recipeDetails = new this.recipeDetailsModel(createRecipeDto.details);
    recipeHeader.details = recipeDetails;
    recipeHeader.save();
    return recipeHeader;
  }

  create(createInventoryDto: CreateInventoryDto) {
    return 'This action adds a new inventory';
  }

  findAll() {
    return `This action returns all inventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
