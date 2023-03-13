import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        {
          overwrite: true,
        },
      );
      return updatedUser;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      await this.userModel.findByIdAndDelete(id);
      return 'User deleted';
    } catch (error) {
      return error;
    }
  }
}
