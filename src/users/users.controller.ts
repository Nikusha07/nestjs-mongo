import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { UserIdParamsDto } from './dto/user-id-params.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException('Could not create user');
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: UserIdParamsDto): Promise<User> {
    const { id } = params;
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException('Could not update user');
    }
  }

  @Delete(':id')
  async remove(@Param() params: UserIdParamsDto): Promise<User> {
    const { id } = params;
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
