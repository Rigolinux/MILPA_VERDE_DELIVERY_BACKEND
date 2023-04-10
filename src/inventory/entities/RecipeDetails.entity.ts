import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RecipeDetails extends Document {
  @Prop({ required: true })
  ID_Product: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  total: number;

  @Prop({ type: Schema })
  ID_Header: string;
}
// relation with BOrdersHeader and BOrdersDetails

export const RecipeDetailsSchema = SchemaFactory.createForClass(RecipeDetails);
