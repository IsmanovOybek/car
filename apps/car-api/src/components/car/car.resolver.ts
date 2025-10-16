import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Car } from '../../libs/dto/car/car';
import { CarInput } from '../../libs/dto/car/car.input';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/types/config';
import { CarUpdate } from '../../libs/dto/car/car.update';

@Resolver()
export class CarResolver {
	constructor(private readonly carService: CarService) {}

	@Roles(MemberType.AGENT)
	@UseGuards(RolesGuard)
	@Mutation(() => Car)
	public async createdCar(@Args('input') input: CarInput, @AuthMember('_id') memberId: ObjectId): Promise<Car> {
		console.log('Mutation: createdCar');
		input.memberId = memberId;
		return await this.carService.createCar(input);
	}

	@UseGuards(WithoutGuard)
	@Query((returns) => Car)
	public async getCar(@Args('carId') input: string, @AuthMember('_id') memberId: ObjectId): Promise<Car> {
		console.log('Query: carId');
		console.log('Query: =>', input);
		const carId = shapeIntoMongoObjectId(input);
		return await this.carService.getCar(memberId, carId);
	}

    @Roles(MemberType.AGENT)
	@UseGuards(RolesGuard)
	@Mutation((returns) => Car)
	public async updateCar(
		@Args('input') input: CarUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Car> {
		console.log('Mutation: updateCar');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.carService.updateCar(memberId, input);
	}
}
