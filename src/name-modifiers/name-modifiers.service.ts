import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class NameModifiersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  list() {
    return this.customerRepository.find();
  }

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
