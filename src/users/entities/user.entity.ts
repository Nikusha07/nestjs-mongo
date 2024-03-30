import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true }) // Ensure unique index is created
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
