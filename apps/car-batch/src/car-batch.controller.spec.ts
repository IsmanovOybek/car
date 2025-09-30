import { Test, TestingModule } from '@nestjs/testing';
import { CarBatchController } from './car-batch.controller';
import { CarBatchService } from './car-batch.service';

describe('CarBatchController', () => {
  let carBatchController: CarBatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CarBatchController],
      providers: [CarBatchService],
    }).compile();

    carBatchController = app.get<CarBatchController>(CarBatchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(carBatchController.getHello()).toBe('Hello World!');
    });
  });
});
