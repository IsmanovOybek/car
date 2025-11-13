import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Notice } from '../../libs/dto/notice/notice';
import { CreateNoticeInput } from '../../libs/dto/notice/notice.input';
import { NoticeCategory, NoticeStatus } from '../../libs/enums/notice.enum';
import { Message } from '../../libs/enums/common.enum';
import { UpdateNoticeInput } from '../../libs/dto/notice/notice.update';

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

	public async updateNotice(memberId: ObjectId, input: UpdateNoticeInput): Promise<Notice> {
		try {
			const { noticeId, ...updateData } = input;

			// Hujjatni topish
			const existNotice = await this.noticeModel.findById(noticeId);
			if (!existNotice) {
				throw new BadRequestException('Notice not found');
			}

			// Yangilanadigan fieldlarni faqat borlarini olish
			const result = await this.noticeModel.findByIdAndUpdate(
				noticeId,
				{
					...updateData, // title/content/status
					memberId, // Kim yangilagan
				},
				{ new: true },
			);

			return result;
		} catch (err) {
			console.log('Error: updateNotice:', err.message);
			throw new BadRequestException('Update failed');
		}
	}

	public async getNotices(input: NoticeCategory): Promise<Notice[]> {
		return await this.noticeModel
			.find({
				noticeCategory: input,
				noticeStatus: NoticeStatus.ACTIVE,
			})
			.sort({ createdAt: -1 });
	}

	public async deleteNotice(noticeId: ObjectId): Promise<Notice> {
		try {
			const exist = await this.noticeModel.findById(noticeId);
			if (!exist) {
				throw new BadRequestException('Notice not found');
			}

			const result = await this.noticeModel.findByIdAndDelete(noticeId);

			return result;
		} catch (err) {
			throw new BadRequestException(Message.REMOVE_FAILED);
		}
	}
}
