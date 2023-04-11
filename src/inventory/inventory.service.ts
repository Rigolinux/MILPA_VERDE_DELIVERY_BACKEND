import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto, CreateRecipeDto } from './dto/';

import { Model, Types, Connection } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { RecipeHeader, RecipeDetails } from './entities/';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(RecipeHeader.name)
    private readonly recipeHeaderModel: Model<RecipeHeader>,
    @InjectModel(RecipeDetails.name)
    private readonly recipeDetailsModel: Model<RecipeDetails>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async createRecipe(createRecipeDto: CreateRecipeDto) {
    try {
      const { details, ...recipeHeader } = createRecipeDto;
      const recipeHeaderModel = await this.recipeHeaderModel.create(
        recipeHeader,
      );
      const recipeDetails = details.map((detail) => ({
        ...detail,
        ID_Header: recipeHeaderModel._id,
      }));
      const arrayDetails = [];
      for (let i = 0; i < recipeDetails.length; i++) {
        const recipeDetail = recipeDetails[i];
        const recipeDetailModel = await this.recipeDetailsModel.create(
          recipeDetail,
        );
        arrayDetails.push(recipeDetailModel);
      }
      return {
        recipeHeader: recipeHeaderModel,
        recipeDetails: arrayDetails,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAllRecipes() {
    return await this.recipeHeaderModel.find();
  }

  async getRecipe(id: string) {
    const recipe = await this.recipeHeaderModel.findById(id);
    if (!recipe) throw new NotFoundException('Recipe not found');
    const details = await this.recipeDetailsModel.find({
      ID_Header: new Types.ObjectId(id),
    });
    return { recipe, details };
  }
}
