import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsEnum, IsMongoId, IsNumber, Min, Max, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ReviewGroup } from '../../enums/reviews.enum';
import { Direction } from '../../enums/common.enum';
import { ObjectId } from 'mongoose';
import { availableReviewSorts } from '../../types/config';

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
@InputType('ReviewSearchInput')
class ReviewSearch {
	@IsNotEmpty()
	@Field(() => String)
	refId: ObjectId;
}

@InputType()
export class ReviewsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availableReviewSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@IsEnum(ReviewGroup)
	@Field(() => ReviewGroup)
	reviewGroup: ReviewGroup;

	@IsNotEmpty()
	@Field(() => ReviewSearch)
	search: ReviewSearch;
}
