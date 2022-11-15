import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.password === pass) {
      const { password, ...validatedUser } = user;
      return validatedUser;
    }
    return null;
  }

  async singUp(userToCreate) {
    return this.usersService.registerUser(userToCreate);
  }

  async login(user: any) {
    const payload = { username: user._doc.email, sub: user._doc._id };
    return {
      username: user.email,
      name: user.name,
      access_token: this.jwtService.sign(payload),
    };
  }
}
