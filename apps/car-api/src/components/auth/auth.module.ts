import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthController } from './google-auth.controller';
import MemberSchema from '../../schemas/Member.model';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Module({
	imports: [
		HttpModule,
		PassportModule,
		MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
		JwtModule.register({
			secret: `${process.env.SECRET_TOKEN}`,
			signOptions: { expiresIn: '30d' },
		}),
	],
	controllers: [GoogleAuthController],
	providers: [AuthService, GoogleStrategy, GoogleAuthGuard],
	exports: [AuthService],
})
export class AuthModule {}
