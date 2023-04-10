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

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  Stock: number;

  @Prop({ enum: Status, default: Status.InUse })
  status: string;

  @Prop({ required: true })
  cost: number;
}

export const RecipeHeaderSchema = SchemaFactory.createForClass(RecipeHeader);
