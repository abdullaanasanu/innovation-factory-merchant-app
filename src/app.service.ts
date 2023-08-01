import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Worldddd!';
  }

  getTest(): string {
    return 'Hello Test!';
  }

  getID(id): string {
    return "This is the ID" + id;
  }
}
