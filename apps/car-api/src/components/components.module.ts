import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import { ViewModule } from './view/view.module';
import { CarModule } from './car/car.module';
import { BoardArticleModule } from './board-article/board-article.module';

@Module({
	imports: [MemberModule, CarModule, AuthModule, ViewModule, BoardArticleModule],
})
export class ComponentsModule {}
