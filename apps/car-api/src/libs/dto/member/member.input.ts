import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { MemberAuthType, MemberType } from '../../enums/member.enum';

@InputType()
export class MemberInput {
	@IsNotEmpty()
	@Length(3, 12)
	@Field(() => String)
	memberNick: string;

	@IsNotEmpty()
	@Length(5, 12)
	@Field(() => String)
	memberPassword: string;

	@IsNotEmpty()
	@Field(() => String)
	@Matches(/^(\+82|0?10)[0-9]{7,8}$|^(\+998)[0-9]{9}$|^(\+1)[0-9]{10}$/, {
		message: 'Phone number must be a valid Korea (+82), Uzbekistan (+998), or USA (+1) number',
	})
	memberPhone: string;

    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean, { nullable: true })
    isVerified?: boolean;

	@IsOptional()
	@Field(() => MemberType, { nullable: true })
	memberType?: MemberType;

	@IsOptional()
	@Field(() => MemberAuthType, { nullable: true })
	memberAuthType?: MemberAuthType;
}

@InputType()
export class LoginInput {
	@IsNotEmpty()
	@Length(3, 12)
	@Field(() => String)
	memberNick: string;

	@IsNotEmpty()
	@Length(5, 12)
	@Field(() => String)
	memberPassword: string;
}
