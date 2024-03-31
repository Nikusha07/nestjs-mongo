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
    if (count === 0) {
      const userToInsert = [];
      console.log("count--->", count);
      for (let i = 0; i < 1000; i++) {
        const user: CreateUserDto = {
          name: faker.person.firstName(),
          age: faker.number.int({ min: 0, max: 100 })
        };
        userToInsert.push(user);
      }
      await this.userModel.insertMany(userToInsert);
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

  findAll(page: number = 1, limit: number = 10) {
    return this.userModel.find().skip((page - 1) * limit).limit(limit);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async remove(id: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(id);
    if (!deleteUser) {
      throw new NotFoundException('User not found');
    }
    return deleteUser;
  }
}
