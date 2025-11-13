import { Args, Mutation, Resolver } from '@nestjs/graphql';
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

@Resolver()
export class NoticeResolver {
	constructor(private readonly noticeService: NoticeService, private readonly authService: AuthService) {}

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
}
