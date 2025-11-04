import { Module } from '@nestjs/common';
import { CarBatchService } from './car-batch.service';
import { DatabaseModule } from './database/database.module';
import { CarBatchController } from './car-batch.controller';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import MemberSchema from 'apps/car-api/src/schemas/Member.model';
import CarSchema from 'apps/car-api/src/schemas/Car.model';

@Module({
	imports: [
		ConfigModule.forRoot(),
		DatabaseModule,
		ScheduleModule.forRoot(),
		MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
		MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
	],
	controllers: [CarBatchController],
	providers: [CarBatchService],
})
export class CarBatchModule {}
