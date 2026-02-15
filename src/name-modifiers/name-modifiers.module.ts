import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameModifiersService } from './name-modifiers.service';
import { NameModifiersController } from './name-modifiers.controller';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [NameModifiersController],
  providers: [NameModifiersService],
})
export class NameModifiersModule {}
