import { Test, TestingModule } from '@nestjs/testing';
import { NameModifiersController } from './name-modifiers.controller';
import { NameModifiersService } from './name-modifiers.service';

describe('NameModifiersController', () => {
  let controller: NameModifiersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NameModifiersController],
      providers: [NameModifiersService],
    }).compile();

    controller = module.get<NameModifiersController>(NameModifiersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
