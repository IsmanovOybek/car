import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CarInput, CarsInquiry } from '../../libs/dto/car/car.input';
import { Car, Cars } from '../../libs/dto/car/car';
import { MemberService } from '../member/member.service';
import { Direction, Message } from '../../libs/enums/common.enum';
import { StatisticModifier, T } from '../../libs/types/common';
import { CarStatus } from '../../libs/enums/car.enum';
import { ViewGroup } from '../../libs/enums/view.enum';
import { ViewService } from '../view/view.service';
import * as moment from 'moment';
import { CarUpdate } from '../../libs/dto/car/car.update';
import { lookupMember, shapeIntoMongoObjectId } from '../../libs/types/config';

@Injectable()
export class CarService {
	constructor(
		@InjectModel('Car') private readonly carModel: Model<Car>,
		private memberService: MemberService,
		private viewService: ViewService,
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

	public async getCar(memberId: ObjectId, carId: ObjectId): Promise<Car> {
		const search: T = {
			_id: carId,
			carStatus: CarStatus.ACTIVE,
		};

		const targetProperty: Car = await this.carModel.findOne(search).lean().exec();
		if (!targetProperty) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		if (memberId) {
			const viewInput = { memberId: memberId, viewRefId: carId, viewGroup: ViewGroup.CAR };
			const newView = await this.viewService.recordView(viewInput);
			if (newView) {
				await this.propertyStatsEditor({ _id: carId, targetKey: 'carViews', modifier: 1 });
				targetProperty.carViews++;
			}
		}

		// meLiked

		targetProperty.memberData = await this.memberService.getMember(null, targetProperty.memberId);
		return targetProperty;
	}

	public async propertyStatsEditor(input: StatisticModifier): Promise<Car> {
		const { _id, targetKey, modifier } = input;
		return await this.carModel.findByIdAndUpdate(_id, { $inc: { [targetKey]: modifier } }, { new: true }).exec();
	}

	public async updateCar(memberId: ObjectId, input: CarUpdate): Promise<Car> {
		let { carStatus, soldAt, deletedAt } = input;
		const search: T = {
			_id: input._id,
			memberId: memberId,
			carStatus: CarStatus.ACTIVE,
		};

		if (carStatus === CarStatus.SOLD) soldAt = moment().toDate();
		else if (carStatus === CarStatus.DELETE) deletedAt = moment().toDate();

		const result = await this.carModel
			.findOneAndUpdate(search, input, {
				new: true,
			})
			.exec();
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

		if (soldAt || deletedAt) {
			await this.memberService.memberStatsEditor({
				_id: memberId,
				targetKey: 'memberCars',
				modifier: -1,
			});
		}

		return result;
	}

	public async getCars(memberId: ObjectId, input: CarsInquiry): Promise<Cars> {
		const match: T = { carStatus: CarStatus.ACTIVE };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		this.shapeMatchQuery(match, input);
		console.log('match:', match);

		const result = await this.carModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							// meLiked
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();
		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		return result[0];
	}

	private shapeMatchQuery(match: T, input: CarsInquiry): void {
		const { memberId, locationList, typeList, yearList, brandList, pricesRange, mileageRange, options, text } =
			input.search ?? {};

		if (memberId) match.memberId = shapeIntoMongoObjectId(memberId);
		if (locationList) match.carLocation = { $in: locationList };
		if (yearList) match.carYears = { $in: yearList };
		if (brandList) match.carBrand = { $in: brandList };
		if (typeList) match.carType = { $in: typeList };

		if (pricesRange) match.carPrice = { $gte: pricesRange.start, $lte: pricesRange.end };
		if (mileageRange) match.carMileage = { $gte: mileageRange.start, $lte: mileageRange.end };

		if (text) match.carTitle = { $regex: new RegExp(text, 'i') };
		if (options) {
			match['$or'] = options.map((ele) => {
				return { [ele]: true };
			});
		}
	}
}
