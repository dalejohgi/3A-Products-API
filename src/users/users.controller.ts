import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateUserDto } from './users-dto/createUserDto';
import { Iuser } from './users-interfaces/Iuser';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // registerUser(@Body() userToCreate: CreateUserDto): Promise<string> {
  //   return this.usersService.registerUser(userToCreate);
  // }

  // @Get()
  // logginUser(@Query() userToLoggin) {
  //   return this.usersService.loggin(userToLoggin)
  // }
}