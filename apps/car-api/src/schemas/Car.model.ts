import { Schema } from 'mongoose';
import { CarBrand, CarLocation, CarStatus, CarType } from '../libs/enums/car.enum';

const CarSchema = new Schema(
	{
		carBrand: {
			type: String,
			enum: CarBrand,
			required: true,
		},

		carType: {
			type: String,
			enum: CarType,
			required: true,
		},

		carStatus: {
			type: String,
			enum: CarStatus,
			default: CarStatus.AVAILABLE,
		},

		carLocation: {
			type: String,
			enum: CarLocation,
			required: true,
		},

		carAddress: {
			type: String,
			required: true,
		},

		carTitle: {
			type: String,
			required: true,
		},

		carPrice: {
			type: Number,
			required: true,
		},

		carMileage: {
			type: Number,
			required: true,
		},

		carSeats: {
			type: Number,
			required: true,
		},

		carYear: {
			type: Number,
			required: true,
		},

		carViews: {
			type: Number,
			default: 0,
		},

		carLikes: {
			type: Number,
			default: 0,
		},

		carComments: {
			type: Number,
			default: 0,
		},

		carRank: {
			type: Number,
			default: 0,
		},

		carImages: {
			type: [String],
			required: true,
		},

		carDesc: {
			type: String,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},

		rentedAt: {
			type: Date,
		},

		deletedAt: {
			type: Date,
		},

		constructedAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'cars' },
);

CarSchema.index({ carBrand: 1, carType: 1, carLocation: 1, carTitle: 1, carPrice: 1 }, { unique: true });

export default CarSchema;
