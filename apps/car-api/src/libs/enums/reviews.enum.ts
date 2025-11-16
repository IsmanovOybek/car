import { registerEnumType } from '@nestjs/graphql';

export enum ReviewGroup {
	CAR = 'CAR',
	ARTICLE = 'ARTICLE',
    AGENT = "AGENT",
}
registerEnumType(ReviewGroup, {
	name: 'ReviewGroup',
});
