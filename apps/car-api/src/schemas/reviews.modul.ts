import { Schema } from 'mongoose';
import { ReviewGroup } from '../libs/enums/reviews.enum';

const ReviewsSchema = new Schema(
	{
		reviewGroup: {
			type: String,
			enum: ReviewGroup,
			required: true,
		},
		refId: {
			type: Schema.Types.ObjectId,
			required: true,
			refPath: 'reviewGroupRef',
		},
		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true,
		},
	},
	{ timestamps: true, collection: 'reviews' },
);
ReviewsSchema.index({ memberId: 1, refId: 1, reviewGroup: 1 }, { unique: true });

export default ReviewsSchema;
