import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
