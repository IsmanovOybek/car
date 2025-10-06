import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { MemberStatus } from '../../libs/enums/member.enum';
import { Message } from '../../libs/enums/common.enum';

@Injectable()
export class MemberService {
	constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) {}

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
        const member = await this.memberModel.findOne({ memberPhone: phone }).exec() as any;
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
		//TODO: hash password
		try {
			const result = await this.memberModel.create(input);
			//TODO: authentication via token
			return result;
		} catch (err) {
			console.log('error service.model', err);
			throw new BadRequestException(err);
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

		// TODO: Compare passwords
		const isMatch = memberPassword === response.memberPassword;
		if (!isMatch) throw new InternalServerErrorException(Message.WRONG_PASSWORD);

		return response;
	}
	public async updateMember(): Promise<string> {
		return 'updateMember exescuted';
	}
	public async getMember(): Promise<string> {
		return 'getMember exescuted';
	}
}
