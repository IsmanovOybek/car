import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { ReviewOutput } from '../../libs/dto/review/review';
import { ReviewInput } from '../../libs/dto/review/review.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { WithoutGuard } from '../auth/guards/without.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver()
export class ReviewResolver {
	constructor(private readonly reviewService: ReviewService) {}

	// ⭐ Yangi review yaratish
	@Roles(MemberType.AGENT, MemberType.USER)
	@UseGuards(RolesGuard)
	@Mutation(() => ReviewOutput)
	async createReview(@Args('input') input: ReviewInput, @AuthMember('_id') memberId: ObjectId): Promise<ReviewOutput> {
		return await this.reviewService.createReview(memberId, input);
	}

	// 🔄 Mavjud reviewni yangilash
	@Roles(MemberType.AGENT, MemberType.USER)
	@UseGuards(RolesGuard)
	@Mutation(() => ReviewOutput)
	async updateReview(@Args('input') input: ReviewInput, @AuthMember('_id') memberId: ObjectId): Promise<ReviewOutput> {
		return await this.reviewService.updateReview(memberId, input);
	}
}
