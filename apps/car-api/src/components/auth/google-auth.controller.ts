import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { MemberAuthType } from '../../libs/enums/member.enum';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth/google')
export class GoogleAuthController {
	constructor(
		private readonly authService: AuthService,
		@InjectModel('Member') private readonly memberModel: Model<Member>,
	) {}

	@Get()
	@UseGuards(GoogleAuthGuard)
	async googleLogin() {
		// Guard browserni Google'ga redirect qiladi
	}

	@Get('callback')
	@UseGuards(GoogleAuthGuard)
	async googleCallback(@Req() req: any, @Res() res: Response) {
		const googleUser = req.user;

		let member = await this.memberModel.findOne({ googleId: googleUser.googleId }).exec();

		if (!member) {
			const nick = this.generateUniqueNick(googleUser);
			const hashedPassword = await this.authService.hashPassWord(`GOOGLE_${googleUser.googleId}_${Date.now()}`);

			member = await this.memberModel.create({
				googleId: googleUser.googleId,
				memberNick: nick,
				memberEmail: googleUser.email || undefined,
				memberPassword: hashedPassword,
				memberAuthType: MemberAuthType.GOOGLE,
				memberFullName: googleUser.fullName || nick,
				memberImage: googleUser.picture || '',
			});
		}

		const token = await this.authService.createToken(member as any);

		const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
		return res.redirect(`${frontendUrl}/auth/google/success?token=${token}`);
	}

	private generateUniqueNick(googleUser: any): string {
		const base = googleUser.fullName?.replace(/\s+/g, '_').slice(0, 8) || 'user';
		return `g_${base}_${googleUser.googleId.toString().slice(-6)}`;
	}
}
