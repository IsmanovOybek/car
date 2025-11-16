import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { ReviewOutput } from '../../libs/dto/review/review';
import { ReviewInput, ReviewsInquiry } from '../../libs/dto/review/review.input';
import { ReviewGroup } from '../../libs/enums/reviews.enum';
import { ReviewListOutput } from '../../libs/dto/review/review.list';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel('Review') private readonly reviewModel: Model<any>,
		@InjectModel('Car') private readonly carModel: Model<any>,
		@InjectModel('Member') private readonly memberModel: Model<any>,
	) {}

	// ⭐ CREATE — yangi review qo‘shish
	public async createReview(memberId: ObjectId, input: ReviewInput): Promise<ReviewOutput> {
		const { refId, reviewGroup, rating } = input;

		const review = await this.reviewModel.create({ memberId, refId, reviewGroup, rating });

		await this.recalculateRating(refId, reviewGroup);

		return review.toObject(); // DTO formatda qaytadi
	}

	// 📄 READ — ma'lum bir obyekt (car/agent) uchun barcha reviewlar va umumiy statistika
	public async getReviews(memberId: ObjectId, input: ReviewsInquiry): Promise<ReviewListOutput> {
		const { refId } = input.search;
		const { reviewGroup } = input;

		const reviews = (await this.reviewModel
			.find({ refId: refId, reviewGroup })
			.sort({ createdAt: -1 })
			.lean()) as unknown as ReviewOutput[];

		const agg = await this.reviewModel.aggregate([
			{ $match: { refId: refId, reviewGroup } },
			{ $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
		]);

		const { avgRating = 0, count = 0 } = (agg[0] as { avgRating: number; count: number }) || { avgRating: 0, count: 0 };

		return {
			reviews,
			avgRating,
			count,
		};
	}

	// 🔄 UPDATE — mavjud reviewni o‘zgartirish
	public async updateReview(memberId: ObjectId, input: ReviewInput): Promise<ReviewOutput> {
		const { refId, reviewGroup, rating } = input;

		const review = await this.reviewModel.findOneAndUpdate({ memberId, refId, reviewGroup }, { rating }, { new: true });

		if (!review) throw new Error('Review not found');

		await this.recalculateRating(refId, reviewGroup);

		return review.toObject();
	}

	// 📊 O‘rtacha bahoni qayta hisoblash (private helper)
	private async recalculateRating(refId: string, reviewGroup: ReviewGroup): Promise<void> {
		const avg = await this.reviewModel.aggregate([
			{ $match: { refId: new Types.ObjectId(refId), reviewGroup } },
			{ $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
		]);

		const result = avg[0] ?? { avgRating: 0, count: 0 };
		console.log('🧮 Avg rating:', result.avgRating, 'Count:', result.count);

		if (reviewGroup === ReviewGroup.CAR) {
			await this.carModel.findByIdAndUpdate(refId, {
				carRating: result.avgRating,
				carRatingCount: result.count,
			});
		} else if (reviewGroup === ReviewGroup.AGENT) {
			await this.memberModel.findByIdAndUpdate(refId, {
				rating: result.avgRating,
				ratingCount: result.count,
			});
		}
	}
}
