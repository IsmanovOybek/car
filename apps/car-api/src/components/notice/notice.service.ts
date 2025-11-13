import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Notice } from '../../libs/dto/notice/notice';
import { CreateNoticeInput } from '../../libs/dto/notice/notice.input';
import { NoticeStatus } from '../../libs/enums/notice.enum';
import { Message } from '../../libs/enums/common.enum';

@Injectable()
export class NoticeService {
	constructor(@InjectModel('Notice') private noticeModel: Model<Notice>) {}

	public async createNotice(memberId: ObjectId, input: CreateNoticeInput): Promise<Notice> {
		try {
			const result = await this.noticeModel.create({
				...input,
				memberId,
				noticeStatus: NoticeStatus.ACTIVE,
			});

			return result;
		} catch (err) {
			console.log('Error, Service.model:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}
}
