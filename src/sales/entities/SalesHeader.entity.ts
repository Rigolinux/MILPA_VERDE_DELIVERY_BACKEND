import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DELIVERED = 'DELIVERED',
}

@Schema()
export class SalesHeader extends Document {
  @Prop({ required: true })
  ID_USER: string;

  @Prop({ required: true })
  dateOfbuy: string;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true, enum: Status })
  status: string;

  @Prop({})
  dateOfDelivered: string;

  @Prop({ required: true })
  TransferNumber: string;

  @Prop({ required: true, enum: Status })
  TransferStatus: string;
}

export const SalesHeaderSchema = SchemaFactory.createForClass(SalesHeader);
