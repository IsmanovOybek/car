import { Injectable } from '@nestjs/common';

@Injectable()
export class CarBatchService {
	getHello(): string {
		return 'Welcome to Car-api-batch';
	}
}
