import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
	private client = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});

	async ask(question: string) {
		const response = await this.client.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [{ role: 'user', content: question }],
		});

		return response.choices[0].message.content;
	}
}
