import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Stock extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  ID_Recipe: string;

  @Prop({ default: 0 })
  Stock: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  FechaCaducidad: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
