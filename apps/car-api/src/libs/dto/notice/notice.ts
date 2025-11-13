import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';

@ObjectType()
export class Notice {
	@Field(() => ID)
	_id: string;

	@Field(() => NoticeCategory)
	noticeCategory: NoticeCategory;

	@Field(() => NoticeStatus)
	noticeStatus: NoticeStatus;

	@Field()
	noticeTitle: string;

	@Field()
	noticeContent: string;

	@Field()
	memberId: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
