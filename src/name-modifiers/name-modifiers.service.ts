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
      output: names.map((customer) => ({
        original: customer.name,
        converted: this.convertReplacementLettersToUmlauts(customer.name),
      })),
    };
  }

  /**
   * Step 2: Generates all possible variations of a name
   * For each umlaut/replacement pair, generates all combinations
   * Examples:
   * KOESTNER -> [KOESTNER, KÖSTNER]
   * RUESSWURM -> [RUESSWURM, RÜßWURM, RUEßWURM, RÜSSWURM]
   * @param name - Input name (e.g., "KOESTNER")
   * @returns Array of all possible name variations
   */
  generateNameVariations(name: string): string[] {
    if (!name) return [name];

    const upperName = name.toUpperCase();
    const variations: Set<string> = new Set([upperName]);

    const generateVariationsRecursive = (current: string) => {
      // Try replacing AE -> Ä
      if (current.includes('AE')) {
        const next = current.replace('AE', 'Ä');
        if (!variations.has(next)) {
          variations.add(next);
          generateVariationsRecursive(next);
        }
      }

      // Try replacing OE -> Ö
      if (current.includes('OE')) {
        const next = current.replace('OE', 'Ö');
        if (!variations.has(next)) {
          variations.add(next);
          generateVariationsRecursive(next);
        }
      }

      // Try replacing UE -> Ü
      if (current.includes('UE')) {
        const next = current.replace('UE', 'Ü');
        if (!variations.has(next)) {
          variations.add(next);
          generateVariationsRecursive(next);
        }
      }

      // Try replacing SS -> ß
      if (current.includes('SS')) {
        const next = current.replace('SS', 'ß');
        if (!variations.has(next)) {
          variations.add(next);
          generateVariationsRecursive(next);
        }
      }
    };

    generateVariationsRecursive(upperName);
    return Array.from(variations).sort();
  }

  async task2(name: string): Promise<object> {
    return {
      results: {
        input: name,
        variations: this.generateNameVariations(name),
      },
    };
  }

  async task2DynamicOutput(): Promise<object> {
    const names = await this.customerRepository.find();
    return {
      results: names.map((customer) => ({
        input: customer.name,
        variations: this.generateNameVariations(customer.name),
      })),
    };
  }

  /**
   * Step 3: Generates SQL statement to search for all variations of a name
   * Examples:
   * KOESTNER -> SELECT * FROM customers WHERE name IN ('KOESTNER', 'KÖSTNER')
   * RUESSWURM -> SELECT * FROM customers WHERE name IN ('RUESSWURM', 'RÜßWURM', 'RUEßWURM', 'RÜSSWURM')
   * @param name - Input name (e.g., "KOESTNER")
   * @param tableName - Table name (default: 'customers')
   * @param columnName - Column name to search (default: 'name')
   * @returns SQL statement for searching all variations
   */
  generateSearchSQL(
    name: string,
    tableName: string = 'customers',
    columnName: string = 'name',
  ): string {
    if (!name) return '';

    const variations = this.generateNameVariations(name);

    // Escape single quotes in names
    const escapedVariations = variations
      .map((v) => `'${v.replace(/'/g, "''")}'`)
      .join(', ');

    return `SELECT * FROM ${tableName} WHERE ${columnName} IN (${escapedVariations})`;
  }

  async task3(name?: string): Promise<object> {
    const sqlStatement = this.generateSearchSQL(name);
    return {
      input: name,
      sqlStatement: sqlStatement,
    };
  }

  async task3DynamicOutput(): Promise<object> {
    const names = await this.customerRepository.find();
    return {
      sqlStatements: names.map((customer) => ({
        name: customer.name,
        sql: this.generateSearchSQL(customer.name),
      })),
    };
  }
}
