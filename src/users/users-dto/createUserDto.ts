import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: number;

  @IsString()
  password: string;
}
