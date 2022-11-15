
require('dotenv').config()

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
const { SECRET_SIGN } = process.env;


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_SIGN,
    });
  }

  async validate(payload: any) {
    console.log(payload)
    return { userId: payload.sub, username: payload.username };
  }
}