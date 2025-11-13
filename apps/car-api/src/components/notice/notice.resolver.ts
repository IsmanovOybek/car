import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { NoticeService } from './notice.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberType } from '../../libs/enums/member.enum';
import { Notice } from '../../libs/dto/notice/notice';
import { CreateNoticeInput } from '../../libs/dto/notice/notice.input';
import { ObjectId } from 'mongoose';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { AuthService } from '../auth/auth.service';
import { UpdateNoticeInput } from '../../libs/dto/notice/notice.update';
import { NoticeCategory } from '../../libs/enums/notice.enum';
import { WithoutGuard } from '../auth/guards/without.guard';

@Resolver()
export class NoticeResolver {
	constructor(
		private readonly noticeService: NoticeService,
		private readonly authService: AuthService,
	) {}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation((returns) => Notice)
	public async createNotice(
		@AuthMember('_id') memberId: ObjectId,
		@Args('input') input: CreateNoticeInput,
	): Promise<Notice> {
		console.log('Mutation: createNotice');
		return await this.noticeService.createNotice(memberId, input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation(() => Notice)
	public async updateNotice(
		@Args('input') input: UpdateNoticeInput,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Notice> {
		console.log('Mutation: updateNotice');
		return await this.noticeService.updateNotice(memberId, input);
	}
	@UseGuards(WithoutGuard)
	@Query(() => [Notice])
	public async getNotices(@Args('input', { type: () => NoticeCategory }) input: NoticeCategory): Promise<Notice[]> {
		console.log('Query: getNoticeList');
		return await this.noticeService.getNotices(input);
	}
}
