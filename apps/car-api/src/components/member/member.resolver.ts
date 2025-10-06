import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	@Mutation(() => Boolean)
	async sendVerificationCode(@Args('phone') phone: string): Promise<boolean> {
		return this.memberService.sendVerificationCode(phone);
	}

	// 2. Kodni tekshirish (OTP verify)
	@Mutation(() => Boolean)
	async verifyPhoneCode(@Args('phone') phone: string, @Args('code') code: string): Promise<boolean> {
		return this.memberService.verifyPhoneCode(phone, code);
	}

	@Mutation(() => Member)
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		console.log('Mutation signup');
		console.log(' input', input);
		return this.memberService.signup(input);
	}

	@Mutation(() => Member)
	public async login(@Args('input') input: LoginInput): Promise<Member> {
		console.log('Mutation login');
		console.log(' input', input);

		return this.memberService.login(input);
	}
	@Mutation(() => String)
	public async updateMember(): Promise<string> {
		console.log('Mutation updateMember');
		return this.memberService.updateMember();
	}
	@Query(() => String)
	public async getMember(): Promise<string> {
		console.log('Mutation getMember');
		return this.memberService.getMember();
	}

	@Mutation(() => String)
	public async getAllMembersByAdmin(): Promise<string> {
		console.log('Mutation getAllMembersByAdmin');
		return this.memberService.getAllMembersByAdmin();
	}

	// Authentication Admin

	@Mutation(() => String)
	public async updateMemberByAdmin(): Promise<string> {
		console.log('Mutation updateMemberByAdmin');
		return this.memberService.updateMemberByAdmin();
	}
}
