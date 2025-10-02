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
			ref: 'Car',
		},
		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},
		rating: {
			type: Number,
			default: 0,
		},

		likes: {
			type: Number,
			default: 0,
		},

		reviewText: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, collection: 'reviews' },
);
ReviewsSchema.index({ memberId: 1, refId: 1, reviewGroup: 1 }, { unique: true });

export default ReviewsSchema;
