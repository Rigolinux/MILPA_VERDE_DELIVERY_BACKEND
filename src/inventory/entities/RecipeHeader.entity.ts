import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum Status {
  InUse = 'InUse',
  Inactive = 'Inactive',
}

@Schema()
export class RecipeHeader extends Document {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;

  @Prop({ default: 0 })
  Stock: number;

  @Prop({ enum: Status, default: Status.InUse })
  status: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  Image: string;
}

export const RecipeHeaderSchema = SchemaFactory.createForClass(RecipeHeader);
