import { registerEnumType } from '@nestjs/graphql';

export enum BookingsStatus {
	PENDING = 'PENDING',
	PAID = 'PAID',
	ONGOING = 'ONGOING',
	FINISHED = 'FINISHED',
	CANCELLED = 'CANCELLED',
}
registerEnumType(BookingsStatus, {
	name: 'BookingsStatus',
});
