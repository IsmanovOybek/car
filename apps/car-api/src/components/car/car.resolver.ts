import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Car } from '../../libs/dto/car/car';
import { CarInput } from '../../libs/dto/car/car.input';

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
}
