import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewResolver } from './review.resolver';
import ReviewsSchema from '../../schemas/reviews.modul';
import { CarModule } from '../car/car.module';
import { MemberModule } from '../member/member.module';
import CarSchema from '../../schemas/Car.model';
import MemberSchema from '../../schemas/Member.model';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Review', schema: ReviewsSchema },
			{ name: 'Car', schema: CarSchema },
			{ name: 'Member', schema: MemberSchema },
		]),
    AuthModule
	],
	providers: [ReviewService, ReviewResolver],
	exports: [ReviewService],
})
export class ReviewModule {}
