import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateStockDto,
  CreateRecipeDto,
  UpdateStockDto,
  UpdateRecipeStockDto,
  CreateRecipeDetailDto,
} from './dto/';

import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { RecipeHeader, RecipeDetails, Stock } from './entities/';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(RecipeHeader.name)
    private readonly recipeHeaderModel: Model<RecipeHeader>,
    @InjectModel(RecipeDetails.name)
    private readonly recipeDetailsModel: Model<RecipeDetails>,
    @InjectModel(Stock.name)
    private readonly stockModel: Model<Stock>,
  ) {}

  //recipes
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

  // async getRecipe(id: string) {
  //   const recipe = await this.recipeHeaderModel.findById(id);
  //   if (!recipe) throw new NotFoundException('Recipe not found');
  //   const details = await this.recipeDetailsModel.find({
  //     ID_Header: new Types.ObjectId(id),
  //   });
  //   return { recipe, details };
  // }

  // Metodo para obtener un recipeheader por id
  async findOneRecipeHeader(id: string) {
    const recipeheader = await this.recipeHeaderModel.findById(id);
    return recipeheader;
  }

  // Metodo para crear un recipedetails dentro de un recipeheader por medio del idheader
  async createRecipeDetail(
    id: string,
    createRecipeDetailDto: CreateRecipeDetailDto,
  ) {
    const recipeheader = await this.recipeHeaderModel.findById(id);
    const recipeDetail = await this.recipeDetailsModel.create({
      ...createRecipeDetailDto,
      ID_Header: recipeheader._id,
    });
    console.log(recipeDetail);
    return recipeDetail;
  }

  // Metodo para actualizar el stock del recipeheader cuando sea mayor o igual al pedido por id
  async updateRecipeStock(id: string, stock: number) {
    const recipe = await this.findOneRecipeHeader(id);

    if (recipe.Stock >= stock) {
      const recipeHeader = await this.recipeHeaderModel.findOneAndUpdate(
        { _id: recipe._id },
        { Stock: recipe.Stock - stock },
        { new: true },
      );
      return recipeHeader;
    }
    return 'No hay suficiente stock';
  }

  //stock
  async createStock(createStockDto: CreateStockDto) {
    const stock = await this.stockModel.create(createStockDto);
    return stock;
  }

  async findAllStock() {
    return await this.stockModel.find();
  }

  async getStock(id: string) {
    const ObjectId = Types.ObjectId;
    const stock = await this.stockModel.find({ _id: new ObjectId(id) });
    if (!stock) throw new NotFoundException('Stock not found');
    return stock;
  }

  async updateStock(id: string, updateStockDto: UpdateStockDto) {
    try {
      const ObjectId = Types.ObjectId;
      const stock = await this.stockModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        updateStockDto,
        { new: true },
      );
      if (!stock) throw new NotFoundException('Stock not found');
      return stock;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteStock(id: string) {
    const ObjectId = Types.ObjectId;
    const stock = await this.stockModel.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (!stock) throw new NotFoundException('Stock not found');
    return stock;
  }
}
