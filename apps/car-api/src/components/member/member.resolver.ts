import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { shapeIntoMongoObjectId } from '../../libs/types/config';

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

	// Authentication
	@UseGuards(AuthGuard)
	@Query(() => String)
	public async checkAuth(@AuthMember() member: Member): Promise<string> {
		const { memberNick, _id } = member;
		console.log('Query checkAuth');
		console.log('memberNick=>', memberNick);
		return `Hi ${memberNick}  and id=> ${_id}`;
	}

	// Authorization
	@Roles(MemberType.USER, MemberType.AGENT)
	@UseGuards(RolesGuard)
	@Query(() => String)
	public async checkAuthRoles(@AuthMember() AuthMember: Member): Promise<string> {
		console.log('Query checkAuthRoles');
		return `Hi ${AuthMember.memberNick}, you are ${AuthMember.memberType} (memberId): ${AuthMember._id}`;
	}

	// Authentication
	@UseGuards(AuthGuard)
	@Mutation(() => Member)
	public async updateMember(
		@Args('input') input: MemberUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Member> {
		console.log('Mutation: updateMember');
		delete input._id;
		return this.memberService.updateMember(memberId, input);
	}

	@Query(() => Member)
	public async getMember(@Args('memberId') input: string): Promise<Member> {
		console.log('Query getMember');
		const targetId = shapeIntoMongoObjectId(input);
		return this.memberService.getMember(targetId);
	}

	// Authentication Admin
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
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
