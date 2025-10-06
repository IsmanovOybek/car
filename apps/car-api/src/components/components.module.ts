import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { CarModule } from './property/property.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MemberModule, CarModule, AuthModule]
})
export class ComponentsModule {}
