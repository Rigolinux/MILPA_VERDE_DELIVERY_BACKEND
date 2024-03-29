import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum Category {
  Food = 'Food',
  Packaging = 'Packaging',
  Other = 'Other',
}

@Schema()
export class Products extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop()
  image: string;

  @Prop({ required: true, enum: Category })
  category: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
