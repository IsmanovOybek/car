import { registerEnumType } from '@nestjs/graphql';

export enum BoardArticleCategory {
	GENERAL = 'General',
	CAR_TIPS = 'Car Tips',
	INDUSTRY_NEWS = 'Industry News',
	TECH_AI = 'Tech & AI',
	HUMOR = 'HUMOR',
}
registerEnumType(BoardArticleCategory, {
	name: 'BoardArticleCategory',
});

export enum BoardArticleStatus {
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(BoardArticleStatus, {
	name: 'BoardArticleStatus',
});
