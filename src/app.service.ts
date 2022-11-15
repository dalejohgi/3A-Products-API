require('dotenv').config();
import { Injectable } from '@nestjs/common';
const { APP_PORT } = process.env;

@Injectable()
export class AppService {
  health(): string {
    return `3A-Products_API is running on port ${APP_PORT}`;
  }
}
