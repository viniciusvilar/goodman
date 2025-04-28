import { Test, TestingModule } from '@nestjs/testing';
import { OrderItensController } from './order-itens.controller';
import { OrderItensService } from './order-itens.service';

describe('OrderItensController', () => {
  let controller: OrderItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItensController],
      providers: [OrderItensService],
    }).compile();

    controller = module.get<OrderItensController>(OrderItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
