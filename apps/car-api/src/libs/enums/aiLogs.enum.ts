import { registerEnumType } from '@nestjs/graphql';

export enum AiLogsType {
	SEARCH = 'SEARCH',
	RECOMMENDATION = 'RECOMMENDATION',
	CHAT = 'CHAT',
	MAPS = 'MAPS',
	REVIEW_ANALYSIS = 'REVIEW_ANALYSIS',
}

registerEnumType(AiLogsType, {
	name: 'AiLogsType',
});
