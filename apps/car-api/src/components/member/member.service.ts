import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
	public async signup(): Promise<string> {
		return 'signup exescuted';
	}
	public async login(): Promise<string> {
		return 'login exescuted';
	}
	public async updateMember(): Promise<string> {
		return 'updateMember exescuted';
	}
	public async getMember(): Promise<string> {
		return 'getMember exescuted';
	}
}
