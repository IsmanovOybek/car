import { registerEnumType } from '@nestjs/graphql';

export enum ReviewGroup {
	CAR = 'CAR',
	MEMBER = 'MEMBER',
}
registerEnumType(ReviewGroup, {
	name: 'ReviewGroup',
});
