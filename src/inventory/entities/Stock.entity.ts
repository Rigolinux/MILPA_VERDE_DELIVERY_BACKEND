import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Stock extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  ID_Recipe: string;

  @Prop({ default: 0 })
  Stock: number;

  @Prop()
  price: number;

  @Prop()
  FechaCaducidad: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
