import { Schema } from 'mongoose';
import {
	CarBrand,
	CarLocation,
	CarStatus,
	CarType,
	Cartransmission,
	DriverType,
	FuelType,
	Ownership,
} from '../libs/enums/car.enum';

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
			default: CarStatus.ACTIVE,
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

		carRating: {
			type: Number,
			default: 0,
		},
		carRatingCount: {
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
		// YANGILIK

		fuelType: {
			type: String,
			enum: FuelType,
			required: true,
			default: FuelType.PETROL,
		},

		driverType: {
			type: String,
			enum: DriverType,
			default: DriverType.FWD,
		},

		carTransmission: {
			type: String,
			enum: Cartransmission,
			default: Cartransmission.AUTOMATIC,
		},

		cylinder: {
			type: Number,
			default: 4,
		},

		carColor: {
			type: String,
			default: 'WHITE',
		},

		carDoors: {
			type: Number,
			default: 4,
		},

		ownership: {
			type: String,
			enum: Ownership,
			default: Ownership.FIRST,
		},

		features: {
			type: [String],
			default: [],
		},
		// JDHJDBVJD

		soldAt: {
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
