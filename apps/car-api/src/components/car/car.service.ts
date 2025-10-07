import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CarService {
	constructor(@InjectModel('Property') private readonly propertyModel: Model<null>) {}
}
