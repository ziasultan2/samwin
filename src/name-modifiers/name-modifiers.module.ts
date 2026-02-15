import { Module } from '@nestjs/common';
import { NameModifiersService } from './name-modifiers.service';
import { NameModifiersController } from './name-modifiers.controller';

@Module({
  controllers: [NameModifiersController],
  providers: [NameModifiersService],
})
export class NameModifiersModule {}
