import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NoticeService {
    constructor(
        @InjectModel('Notice') private noticeModel: Model<void>,
      ) {}
}
