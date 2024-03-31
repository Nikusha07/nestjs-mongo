import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { NotFoundException, OnModuleInit } from '@nestjs/common';

export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  async onModuleInit() {
    const count = await this.userModel.countDocuments();
    if(count === 0) {
      const userToInsert = [];
      for(let i = 0; i < 3; i++){
        const user : User = {
          name: faker.person.firstName(),
          age: faker.number.int({min:0, max:100})
        };
        userToInsert.push(user);
      }
      console.log(userToInsert)
    }
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) { 
        throw new Error('Email already exists');
      } else {
        throw error; 
      }
    }
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.userModel.findByIdAndUpdate(id, updateUserDto , {new : true});
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(id);
    if (!deleteUser) {
      throw new NotFoundException('User not found');
    }
    return deleteUser;
  }
}
