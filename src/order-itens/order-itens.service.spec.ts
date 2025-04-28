import { Test, TestingModule } from '@nestjs/testing';
import { OrderItensService } from './order-itens.service';

describe('OrderItensService', () => {
  let service: OrderItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderItensService],
    }).compile();

    service = module.get<OrderItensService>(OrderItensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
