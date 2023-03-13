import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createuserDto: CreateUserDto) {
    return this.authService.register(createuserDto);
  }
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
