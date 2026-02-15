import { Test, TestingModule } from '@nestjs/testing';
import { NameModifiersService } from './name-modifiers.service';

describe('NameModifiersService', () => {
  let service: NameModifiersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NameModifiersService],
    }).compile();

    service = module.get<NameModifiersService>(NameModifiersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
