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

  /**
   * Step 1: Converts replacement letters to their umlaut counterparts
   * AE -> Ä, OE -> Ö, UE -> Ü, SS -> ß
   * @param name - Input name with replacement letters (e.g., "KOESTNER")
   * @returns Name with umlauts (e.g., "KÖSTNER")
   */
  convertReplacementLettersToUmlauts(name: string): string {
    if (!name) return name;

    let result = name.toUpperCase();

    result = result.replace(/SS(?=[A-Z]|$)/g, 'ß');
    result = result.replace(/AE/g, 'Ä');
    result = result.replace(/OE/g, 'Ö');
    result = result.replace(/UE/g, 'Ü');

    return result;
  }

  async task1(name?: string): Promise<object> {
    if (name) {
      return {
        input: name,
        output: this.convertReplacementLettersToUmlauts(name),
      };
    }

    // If no name provided, convert all names from database
    const names = await this.customerRepository.find();
    return {
      count: names.length,
      output: names.map(customer => ({
        original: customer.name,
        converted: this.convertReplacementLettersToUmlauts(customer.name),
      })),
    };
  }

  task2() {
    return `This action executes task2`;
  }

  task3() {
    return `This action executes task3`;
  }
}
