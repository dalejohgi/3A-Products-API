import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './users-dto/createUserDto';
import { Iuser } from './users-interfaces/Iuser';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<Iuser>) {}

  async registerUser(userToCreate: CreateUserDto) {
    const { email } = userToCreate;
    const doesUserExist = await this.userModel.findOne({ email }).exec();

    if (doesUserExist) {
      return 'User already exist, try using another email account';
    }
    const newUser = new this.userModel(userToCreate);
    await newUser.save();

    return `User ${email} has been created succesfully`;
  }

  async findOneByEmail(email: string): Promise<Iuser | undefined> {
    return await this.userModel.findOne({ email });
  }
}
