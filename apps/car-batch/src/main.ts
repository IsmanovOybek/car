import { NestFactory } from '@nestjs/core';
import { CarBatchModule } from './car-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(CarBatchModule);
  await app.listen(process.env.PORT_BATCH ?? 3000);
}
bootstrap();
