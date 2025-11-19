import { Args, Query, Resolver } from '@nestjs/graphql';
import { AiService } from './ai.service';
import { UseGuards } from '@nestjs/common';
import { WithoutGuard } from '../auth/guards/without.guard';

@Resolver()
export class AiResolver {
	constructor(private readonly aiService: AiService) {}

	@UseGuards(WithoutGuard)
	@Query(() => String)
	async askAi(@Args('question') question: string): Promise<string> {
		console.log('Received question');
		return await this.aiService.ask(question);
	}
}
