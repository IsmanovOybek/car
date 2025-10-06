import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { MemberStatus } from '../../libs/enums/member.enum';
import { Message } from '../../libs/enums/common.enum';
import { AuthService } from '../auth/auth.service';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { T } from '../../libs/types/common';

@Injectable()
export class MemberService {
	constructor(
		@InjectModel('Member') private readonly memberModel: Model<Member>,
		private authService: AuthService,
	) {}

	// // 1️⃣ sendVerificationCode
	async sendVerificationCode(phone: string): Promise<boolean> {
		const code = Math.floor(100000 + Math.random() * 900000).toString();

		console.log(`📩 Verification code for ${phone}: ${code}`);

		await this.memberModel.updateOne(
			{ memberPhone: phone },
			{
				verificationCode: code,
				codeExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
			},
			{ upsert: true },
		);

		return true;
	}

	// 2️⃣ Kodni tekshirish
	async verifyPhoneCode(phone: string, code: string): Promise<boolean> {
		const member = (await this.memberModel.findOne({ memberPhone: phone }).exec()) as any;
		if (!member) throw new BadRequestException('Invalid phone or code'); // generic xabar

		if (!member.verificationCode || member.verificationCode !== code)
			throw new BadRequestException('Invalid phone or code');

		if (member.codeExpiresAt && member.codeExpiresAt < new Date())
			throw new BadRequestException('Verification code expired');

		member.isVerified = true;
		member.verificationCode = null;
		member.codeExpiresAt = null;
		await member.save();

		return true;
	}

	public async signup(input: MemberInput): Promise<Member> {
		input.memberPassword = await this.authService.hashPassWord(input.memberPassword);
		try {
			const result = await this.memberModel.create(input);
			result.accessToken = await this.authService.createToken(result);
			return result;
		} catch (err) {
			console.log('error service.model', err);
			throw new BadRequestException(Message.USED_MEMBER_NICK_OR_PHONE);
		}
	}
	public async login(input: LoginInput): Promise<Member> {
		const { memberNick, memberPassword } = input;
		const response: Member = await this.memberModel
			.findOne({ memberNick: memberNick })
			.select('+memberPassword')
			.exec();

		if (!response || response.memberStatus === MemberStatus.DELETE) {
			throw new InternalServerErrorException(Message.NO_MEMBER_NICK);
		} else if (response.memberStatus === MemberStatus.BLOCK) {
			throw new InternalServerErrorException(Message.BLOCKED_USER);
		}

		const isMatch = await this.authService.comparePassWords(input.memberPassword, response.memberPassword);
		if (!isMatch) throw new InternalServerErrorException(Message.WRONG_PASSWORD);
		response.accessToken = await this.authService.createToken(response);

		return response;
	}
	public async updateMember(memberId: ObjectId, input: MemberUpdate): Promise<Member> {
		const result: Member = await this.memberModel
			.findOneAndUpdate(
				{
					_id: memberId,
					memberStatus: MemberStatus.ACTIVE,
				},
				input,
				{ new: true },
			)
			.exec();

		if (!result) throw new InternalServerErrorException(Message.UPLOAD_FAILED);

		result.accessToken = await this.authService.createToken(result);
		return result;
	}
	public async getMember(targetId: ObjectId): Promise<Member> {
		const search: T = {
			_id: targetId,
			memberStatus: {
				$in: [MemberStatus.ACTIVE, MemberStatus.BLOCK],
			},
		};

		const targetMember = await this.memberModel.findOne(search).exec();

		if (!targetMember) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		return targetMember;
	}

	public async getAllMembersByAdmin(): Promise<string> {
		return 'getAllMembersByAdmin exescuted';
	}

	public async updateMemberByAdmin(): Promise<string> {
		return 'updateMemberByAdmin exescuted';
	}
}
