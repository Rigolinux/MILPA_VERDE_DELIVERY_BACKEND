import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BOrdersDetails extends Document {
  @Prop({ required: true })
  ID_Product: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  ID_Header: string;
}

export const ProductHeaderSchema = SchemaFactory.createForClass(BOrdersDetails);
