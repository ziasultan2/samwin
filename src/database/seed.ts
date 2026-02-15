import { DataSource } from 'typeorm';
import { Customer } from '../name-modifiers/entities/customer.entity';
import { seedCustomers } from './seeds/customer.seed';

export async function runSeed(dataSource: DataSource) {
  console.log('🌱 Running database seeds...');

  try {
    await seedCustomers(dataSource);
    console.log('✓ All seeds completed successfully');
  } catch (error) {
    console.error('✗ Seeding failed:', error);
    throw error;
  }
}

async function bootstrap() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'samwin',
    entities: [Customer],
    synchronize: true,
  });

  await dataSource.initialize();
  await runSeed(dataSource);
  await dataSource.destroy();
}

bootstrap().catch((error) => {
  console.error('Seed script error:', error);
  process.exit(1);
});
