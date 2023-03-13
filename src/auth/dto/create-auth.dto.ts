import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  password: string;
}
