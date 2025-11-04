import { Module } from '@nestjs/common';
import { CarBatchService } from './car-batch.service';
import { DatabaseModule } from './database/database.module';
import { CarBatchController } from './car-batch.controller';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [ConfigModule.forRoot(),DatabaseModule, ScheduleModule.forRoot()],
	controllers: [CarBatchController],
	providers: [CarBatchService],
})
export class CarBatchModule {}
