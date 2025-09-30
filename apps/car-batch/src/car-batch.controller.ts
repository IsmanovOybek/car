import { Controller, Get } from '@nestjs/common';
import { CarBatchService } from './car-batch.service';

@Controller()
export class CarBatchController {
  constructor(private readonly carBatchService: CarBatchService) {}

  @Get()
  getHello(): string {
    return this.carBatchService.getHello();
  }
}
