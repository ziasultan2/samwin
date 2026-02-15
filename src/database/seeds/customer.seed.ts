import { DataSource } from 'typeorm';
import { Customer } from '../../name-modifiers/entities/customer.entity';

const customerData = [
  { name: 'KOESTNER'},
  { name: 'RUESSWURM'},
  { name: 'DUERMUELLER'},
  { name: 'JAEAESKELAEINEN'},
  { name: 'GROSSSCHAEDL'},
];

export async function seedCustomers(dataSource: DataSource) {
  const repository = dataSource.getRepository(Customer);

  // Clear existing data
  await repository.clear();

  // Seed new data
  for (const data of customerData) {
    const customer = repository.create(data);
    await repository.save(customer);
  }

  console.log('✓ Customers seeded successfully');
}
