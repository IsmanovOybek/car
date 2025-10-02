import { Schema } from 'mongoose';
import { BookingsStatus } from '../libs/enums/bookings.enum';

const BookingsSchema = new Schema(
	{
		articleCategory: {
			type: String,
			enum: BookingsStatus,
			required: true,
		},
		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},
		carId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Car',
		},
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
		totalPrice: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true, collection: 'bookings' },
);
export default BookingsSchema;
