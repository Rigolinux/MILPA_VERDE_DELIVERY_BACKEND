import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SalesDetails extends Document {
  @Prop({ required: true })
  ID_sale: string;

  @Prop({ required: true })
  ID_recipe: string;

  @Prop({ required: true })
  dateOfbuy: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  total: number;
}

export const SalesDetailsSchema = SchemaFactory.createForClass(SalesDetails);
