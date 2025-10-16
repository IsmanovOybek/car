import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarInput } from '../../libs/dto/car/car.input';
import { Car } from '../../libs/dto/car/car';
import { MemberService } from '../member/member.service';
import { Message } from '../../libs/enums/common.enum';

@Injectable()
export class CarService {
	constructor(
		@InjectModel('Car') private readonly carModel: Model<Car>,
		private memberService: MemberService,
	) {}

	public async createCar(input: CarInput): Promise<Car> {
		try {
			const result = await this.carModel.create(input);

			await this.memberService.memberStatsEditor({
				_id: result.memberId,
				targetKey: 'memberProperties',
				modifier: 1,
			});

			return result;
		} catch (err) {
			console.log('Error, Service.model:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}
}
