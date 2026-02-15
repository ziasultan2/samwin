import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NameModifiersService } from './name-modifiers.service';
import { CreateNameModifierDto } from './dto/create-name-modifier.dto';
import { UpdateNameModifierDto } from './dto/update-name-modifier.dto';

@Controller('name-modifiers')
export class NameModifiersController {
  constructor(private readonly nameModifiersService: NameModifiersService) {}

  @Get('task1')
  task1() {
    return this.nameModifiersService.task1();
  }

  @Get('task2')
  task2() {
    return this.nameModifiersService.task2();
  }

  @Get('task3')
  task3() {
    return this.nameModifiersService.task3();
  }
}
