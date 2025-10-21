import { registerEnumType } from '@nestjs/graphql';

export enum ReviewGroup {
	CAR = 'CAR',
	MEMBER = 'MEMBER',
    AGENT = "AGENT",
}
registerEnumType(ReviewGroup, {
	name: 'ReviewGroup',
});
