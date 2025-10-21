import { InputType, Field, Float } from '@nestjs/graphql';
import { IsEnum, IsMongoId, IsNumber, Min, Max } from 'class-validator';
import { ReviewGroup } from '../../enums/reviews.enum';

@InputType()
export class ReviewInput {
	@Field(() => String)
	@IsMongoId()
	refId: string; // Car yoki Member ID

	@Field(() => ReviewGroup)
	@IsEnum(ReviewGroup)
	reviewGroup: ReviewGroup; // 'CAR' | 'AGENT'

	@Field(() => Float)
	@IsNumber()
	@Min(1)
	@Max(5)
	rating: number; // 1–5 yulduz
}
