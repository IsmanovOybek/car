import { Module } from '@nestjs/common';
import { CarBatchController } from './car-batch.controller';
import { CarBatchService } from './car-batch.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [ConfigModule.forRoot(), , DatabaseModule, ScheduleModule.forRoot()],
	controllers: [CarBatchController],
	providers: [CarBatchService],
})
export class CarBatchModule {}
