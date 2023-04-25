import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SalesDetails extends Document {
  @Prop({ required: true })
  ID_recipe: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

export const SalesDetailsSchema = SchemaFactory.createForClass(SalesDetails);
