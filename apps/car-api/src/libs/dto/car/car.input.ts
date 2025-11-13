import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { ObjectId } from 'mongoose';
import {
	CarBrand,
	CarLocation,
	CarStatus,
	Cartransmission,
	CarType,
	DriverType,
	FuelType,
	Ownership,
} from '../../enums/car.enum';
import { availableOptions, availablePropertySorts } from '../../types/config';
import { Direction } from '../../enums/common.enum';

@InputType()
export class CarInput {
	@IsNotEmpty()
	@Field(() => CarBrand)
	carBrand: CarBrand;

	@IsNotEmpty()
	@Field(() => CarType)
	carType: CarType;

	@IsNotEmpty()
	@Field(() => CarLocation)
	carLocation: CarLocation;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	carAddress: string;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	carTitle: string;

	@IsNotEmpty()
	@Field(() => Number)
	carPrice: number;

	@IsNotEmpty()
	@Field(() => Number)
	carMileage: number;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Field(() => Int)
	carSeats: number;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Field(() => Int)
	carYear: number;

	@IsNotEmpty()
	@Field(() => [String])
	carImages: string[];

	// 🔋 Yoqilg‘i turi (Fuel type)
	@IsOptional()
	@Field(() => FuelType, { nullable: true })
	fuelType?: FuelType;

	@IsOptional()
	@Field(() => Cartransmission, { nullable: true })
	carTransmission?: Cartransmission;

	@IsOptional()
	@Field(() => DriverType, { nullable: true })
	driverType?: DriverType;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	cylinder?: number;

	@IsOptional()
	@Field(() => String, { nullable: true })
	carColor?: string;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	carDoors?: number;

	@IsOptional()
	@Field(() => Ownership, { nullable: true })
	ownership?: Ownership;

	@IsOptional()
	@Field(() => [String], { nullable: true })
	features?: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	carDesc?: string;

	memberId?: ObjectId;

	@IsOptional()
	@Field(() => Date, { nullable: true })
	constructedAt?: Date;
}

@InputType()
export class PricesRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class MileageRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class PeriodsRange {
	@Field(() => Date)
	start: Date;

	@Field(() => Date)
	end: Date;
}

@InputType()
class PISearch {
	@IsOptional()
	@Field(() => String, { nullable: true })
	memberId?: ObjectId;

	@IsOptional()
	@Field(() => [CarLocation], { nullable: true })
	locationList?: CarLocation[];

	@IsOptional()
	@Field(() => [CarType], { nullable: true })
	typeList?: CarType[];

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	yearList?: number[]; // ishlab chiqarilgan yillar (masalan [2019, 2020, 2021])

	@IsOptional()
	@Field(() => [String], { nullable: true })
	brandList?: string[]; // “Hyundai”, “Kia”, “BMW” va h.k.

	@IsOptional()
	@IsIn(availableOptions, { each: true })
	@Field(() => [String], { nullable: true })
	options?: string[];

	@IsOptional()
	@Field(() => PricesRange, { nullable: true })
	pricesRange?: PricesRange;

	@IsOptional()
	@Field(() => MileageRange, { nullable: true })
	mileageRange?: MileageRange;

	@IsOptional()
	@Field(() => String, { nullable: true })
	text?: string;

	@IsOptional()
	@Field(() => [FuelType], { nullable: true })
	fuelTypeList?: FuelType[];

	@IsOptional()
	@Field(() => [Cartransmission], { nullable: true })
	transmissionList?: Cartransmission[];

	@IsOptional()
	@Field(() => [DriverType], { nullable: true })
	driverTypeList?: DriverType[];

	@IsOptional()
	@Field(() => [Ownership], { nullable: true })
	ownershipList?: Ownership[];

	@IsOptional()
	@Field(() => [String], { nullable: true })
	colorList?: string[];

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	seatList?: number[];

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	doorList?: number[];

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	cylinderList?: number[];

	@IsOptional()
	@Field(() => [String], { nullable: true })
	featuresList?: string[];
}
@InputType()
export class CarsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => PISearch, { nullable: true })
	search: PISearch;
}

@InputType()
class APISearch {
	@IsOptional()
	@Field(() => CarStatus, { nullable: true })
	carStatus?: CarStatus;
}

@InputType()
export class AgentCarInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => APISearch)
	search: APISearch;
}

@InputType()
class ALPISearch {
	@IsOptional()
	@Field(() => CarStatus, { nullable: true })
	carStatus?: CarStatus;

	@IsOptional()
	@Field(() => [CarLocation], { nullable: true })
	carLocationList?: CarLocation[];
}

@InputType()
export class AllCarsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => ALPISearch)
	search: ALPISearch;
}

@InputType()
export class OrdinaryInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;
}
