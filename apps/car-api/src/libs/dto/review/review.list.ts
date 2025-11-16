import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ReviewOutput } from './review';

@ObjectType()
export class ReviewListOutput {
	@Field(() => [ReviewOutput])
	reviews: ReviewOutput[];

	@Field(() => Float)
	avgRating: number;

	@Field(() => Number)
	count: number;
}
