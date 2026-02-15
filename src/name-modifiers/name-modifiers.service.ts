import { Injectable } from '@nestjs/common';

@Injectable()
export class NameModifiersService {

  task1() {
    return `This action executes task1`;
  }

  task2() {
    return `This action executes task2`;
  }

  task3() {
    return `This action executes task3`;
  }
}
