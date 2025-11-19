import { Module } from '@nestjs/common';
import { AiResolver } from './ai.resolver';
import { AiService } from './ai.service';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [AuthModule],
	providers: [AiResolver, AiService],
})
export class AiModule {}
