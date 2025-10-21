import { ObjectType, Field, Float } from '@nestjs/graphql';
import { ReviewGroup } from '../../enums/reviews.enum';

@ObjectType()
export class ReviewOutput {
	@Field(() => String)
	_id: string;

	@Field(() => ReviewGroup)
	reviewGroup: ReviewGroup;

	@Field(() => String)
	refId: string;

	@Field(() => String)
	memberId: string;

	@Field(() => Float)
	rating: number;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
