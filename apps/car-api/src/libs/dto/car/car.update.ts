import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import type { ObjectId } from 'mongoose';
import {
	CarBrand,
	CarLocation,
	CarStatus,
	CarType,
	Cartransmission,
	DriverType,
	FuelType,
	Ownership,
} from '../../enums/car.enum';

@InputType()
export class CarUpdate {
	//  Property ID — bu yangilanadigan uyning unikal ID-si
	@IsNotEmpty()
	@Field(() => String)
	_id: ObjectId;

	@IsOptional()
	@Field(() => CarBrand, { nullable: true })
	carBrand?: CarBrand;

	// Car turi (Apartment, House, Office va h.k.)
	@IsOptional()
	@Field(() => CarType, { nullable: true })
	carType?: CarType;

	//  Property holati (Active, Sold, Deleted)
	@IsOptional()
	@Field(() => CarStatus, { nullable: true })
	carStatus?: CarStatus;

	//  Manzil joylashuvi (BUSAN, SEOUL, va h.k.)
	@IsOptional()
	@Field(() => CarLocation, { nullable: true })
	carLocation?: CarLocation;

	// To‘liq manzil
	@IsOptional()
	@Length(3, 100)
	@Field(() => String, { nullable: true })
	carAddress?: string;

	//  Property sarlavhasi
	@IsOptional()
	@Length(3, 100)
	@Field(() => String, { nullable: true })
	carTitle?: string;

	//  Narxi
	@IsOptional()
	@Field(() => Number, { nullable: true })
	carPrice?: number;

	//  Maydoni (kv. metr)
	@IsOptional()
	@Field(() => Number, { nullable: true })
	carMileage?: number;

	//  Yotoq xonalari soni
	@IsOptional()
	@IsInt()
	@Min(1)
	@Field(() => Int, { nullable: true })
	carSeats?: number;

	//  Umumiy xonalar soni
	@IsOptional()
	@IsInt()
	@Min(1)
	@Field(() => Int, { nullable: true })
	carYear?: number;

	// Rasm fayllar
	@IsOptional()
	@Field(() => [String], { nullable: true })
	carImages?: string[];

	//  Qo‘shimcha tavsif
	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	carDesc?: string;

	// 🔋 Yoqilg'i turi (Fuel type)
	@IsOptional()
	@Field(() => FuelType, { nullable: true })
	fuelType?: FuelType;

	// ⚙️ Transmission (Avtomatik yoki Mexanik)
	@IsOptional()
	@Field(() => Cartransmission, { nullable: true })
	carTransmission?: Cartransmission;

	// 🚗 Driver type (FWD, RWD, AWD, 4WD)
	@IsOptional()
	@Field(() => DriverType, { nullable: true })
	driverType?: DriverType;

	// 🔢 Silindrlar soni
	@IsOptional()
	@IsInt()
	@Min(1)
	@Field(() => Int, { nullable: true })
	cylinder?: number;

	// 🎨 Rangi
	@IsOptional()
	@Field(() => String, { nullable: true })
	carColor?: string;

	// 🚪 Eshiklar soni
	@IsOptional()
	@IsInt()
	@Min(1)
	@Field(() => Int, { nullable: true })
	carDoors?: number;

	// 👤 Egalik tartibi (Birinchi, Ikkinchi, Uchinchi yoki ko'p)
	@IsOptional()
	@Field(() => Ownership, { nullable: true })
	ownership?: Ownership;

	// ✨ Xususiyatlar (Features) - A/C, Backup Camera, Navigation va h.k.
	@IsOptional()
	@Field(() => [String], { nullable: true })
	features?: string[];

	// Sotilgan sana
	soldAt?: Date;

	// O'chirilgan sana
	deletedAt?: Date;

	// Qurilgan sana
	@IsOptional()
	@Field(() => Date, { nullable: true })
	constructedAt?: Date;
}
