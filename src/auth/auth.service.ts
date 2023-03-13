import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

import { LoginAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from './dto/register-user.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async finduser(username: string) {
    try {
      const user = await this.userModel.findOne({ username });
      if (!user) return new UnauthorizedException('Invalid credentials');
      return user;
    } catch (error) {
      return error;
    }
  }
  async login(loginAuthDto: LoginAuthDto) {
    try {
      const user = await this.finduser(loginAuthDto.username);

      const isMatch = await bcrypt.compare(
        loginAuthDto.password,
        user.password,
      );

      if (!isMatch) return new UnauthorizedException('Invalid credentials');

      const payload = {
        username: user.username,
        email: user.email,
        id: user._id.toString(),
      };

      const token = await this.jwtService.sign(payload);
      const data = {
        token,
        user,
      };
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async register(createuserDto: CreateUserDto) {
    try {
      const { password } = createuserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      createuserDto.password = hashedPassword;
      const user = await this.userModel.create(createuserDto);
      return user;
    } catch (error) {
      return error;
    }
  }
}
