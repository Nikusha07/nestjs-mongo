import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nikatefnadze3:Nikusha007@cluster0.clzrqvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
