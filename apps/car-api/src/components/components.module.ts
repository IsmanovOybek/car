import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { CarModule } from './property/property.module';

@Module({
  imports: [MemberModule, CarModule]
})
export class ComponentsModule {}
