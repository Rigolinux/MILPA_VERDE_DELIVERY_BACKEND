import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Providers extends Document {
  @Prop({ required: true, unique: true })
  ProviderName: string;

  @Prop({ required: true, unique: true })
  mail: string;

  @Prop({ required: false })
  mobileNumber: number;

  @Prop({ default: 0 })
  address: string;

  @Prop({ required: false })
  website: string;
}

// TODO - Add a providers table

export const ProvidersSchema = SchemaFactory.createForClass(Providers);
