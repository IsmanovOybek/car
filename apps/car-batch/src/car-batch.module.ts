import { Module } from '@nestjs/common';
import { CarBatchController } from './car-batch.controller';
import { CarBatchService } from './car-batch.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [CarBatchController],
	providers: [CarBatchService],
})
export class CarBatchModule {}
