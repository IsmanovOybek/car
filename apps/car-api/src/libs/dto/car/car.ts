import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import {
	CarBrand,
	CarLocation,
	CarStatus,
	CarType,
	FuelType,
	DriverType,
	Ownership,
	Cartransmission,
} from '../../enums/car.enum';
import { Member, TotalCounter } from '../member/member';
import { MeLiked } from '../like/like';

@ObjectType()
export class Car {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => CarBrand)
	carBrand: CarBrand;

	@Field(() => CarType)
	carType: CarType;

	@Field(() => CarStatus)
	carStatus: CarStatus;

	@Field(() => CarLocation)
	carLocation: CarLocation;

	@Field(() => String)
	carAddress: string;

	@Field(() => String)
	carTitle: string;

	@Field(() => Number)
	carPrice: number;

	@Field(() => Number)
	carMileage: number;

	@Field(() => Int)
	carSeats: number;

	@Field(() => Int)
	carYear: number;

	@Field(() => Int)
	carViews: number;

	@Field(() => Int)
	carLikes: number;

	@Field(() => Int)
	carComments: number;

	@Field(() => Int)
	carRank: number;

	@Field(() => [String])
	carImages: string[];

	@Field(() => String, { nullable: true })
	carDesc?: string;

	@Field(() => String)
	memberId: ObjectId;

	// 🆕 Qo‘shimcha field’lar (frontend filterlariga mos)
	@Field(() => FuelType, { nullable: true })
	fuelType?: FuelType;

	@Field(() => Cartransmission, { nullable: true })
	carTransmission?: Cartransmission;

	@Field(() => DriverType, { nullable: true })
	driverType?: DriverType;

	@Field(() => Ownership, { nullable: true })
	ownership?: Ownership;

	@Field(() => String, { nullable: true })
	carColor?: string;

	@Field(() => Int, { nullable: true })
	carDoors?: number;

	@Field(() => Int, { nullable: true })
	cylinder?: number;

	@Field(() => [String], { nullable: true })
	features?: string[];

	// 🕒 vaqt maydonlari
	@Field(() => Date, { nullable: true })
	soldAt?: Date;

	@Field(() => Date, { nullable: true })
	deletedAt?: Date;

	@Field(() => Date, { nullable: true })
	constructedAt?: Date;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	/** 🔗 Aggregation relations */
	@Field(() => [MeLiked], { nullable: true })
	meLiked?: MeLiked[];

	@Field(() => Member, { nullable: true })
	memberData?: Member;
}

@ObjectType()
export class Cars {
	@Field(() => [Car])
	list: Car[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}
