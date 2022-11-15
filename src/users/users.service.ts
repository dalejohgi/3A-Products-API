require('dotenv').config()

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { CreateUserDto } from './users-dto/createUserDto';
import { Iuser } from './users-interfaces/Iuser';

const { SECRET_SIGN } = process.env;

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

  // async loggin(userToLoggin) {
  //   const { name, email, password } = userToLoggin;
  //   const userFound = await this.userModel.findOne({ email }).exec();
  //   if (!userFound) {
  //     return 'Account doesn\'t exists. Please sing up'
  //   }

  //   if (userFound.password !== password) {
  //     return 'Incorrect password'
  //   }
  //   const payload = {
  //     username: userFound.email,
  //     sub: userFound._id,
  //     iat: dayjs().unix(),
  //     exp: dayjs().add(1, 'days').unix()
  //   }
  //   const accessToken = jwt.sign(payload, SECRET_SIGN);
  //   const decodedToken = jwt.verify(accessToken, SECRET_SIGN)
  //   return {
  //     name,
  //     email,
  //     accessToken
  //   };
  // }
  
  async findOneByEmail(email: string): Promise<Iuser | undefined> {
    return await this.userModel.findOne({ email }).exec(); // validate exec
  }

}
