import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Лютый разнос Нижнего Новгорода';
  }
}
