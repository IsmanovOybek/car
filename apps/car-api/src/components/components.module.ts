import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import { ViewModule } from './view/view.module';
import { CarModule } from './car/car.module';
import { BoardArticleModule } from './board-article/board-article.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ReviewModule } from './review/review.module';
import { FollowModule } from './follow/follow.module';
import { NoticeModule } from './notice/notice.module';
import { AiModule } from './ai/ai.module';

@Module({
	imports: [MemberModule, CarModule, AuthModule, ViewModule, BoardArticleModule, CommentModule, LikeModule, ReviewModule, FollowModule, NoticeModule, AiModule],
})
export class ComponentsModule {}
