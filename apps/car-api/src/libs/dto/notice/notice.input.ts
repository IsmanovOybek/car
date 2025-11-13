import { Field, InputType } from '@nestjs/graphql';
import { NoticeCategory } from '../../enums/notice.enum';

@InputType()
export class CreateNoticeInput {
	@Field(() => NoticeCategory)
	noticeCategory: NoticeCategory;

	@Field()
	noticeTitle: string;

	@Field()
	noticeContent: string;
}
