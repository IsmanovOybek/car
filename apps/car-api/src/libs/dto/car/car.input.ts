import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { ObjectId } from 'mongoose';
import { CarBrand, CarLocation, CarType } from '../../enums/car.enum';

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

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	carDesc?: string;

	memberId?: ObjectId;

	@IsOptional()
	@Field(() => Date, { nullable: true })
	constructedAt?: Date;
}
