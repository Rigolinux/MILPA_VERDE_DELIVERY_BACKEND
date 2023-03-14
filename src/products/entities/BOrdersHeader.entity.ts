import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Schema()
export class BOrdersHeader extends Document {
  @Prop({ required: true })
  provider: string;

  @Prop({ required: true })
  OrderDate: Date;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true, enum: Status })
  status: string;
}

export const ProductHeaderSchema = SchemaFactory.createForClass(BOrdersHeader);
