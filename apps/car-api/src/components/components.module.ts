import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { CarModule } from './property/property.module';
import { AuthModule } from './auth/auth.module';
import { ViewModule } from './view/view.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [MemberModule, CarModule, AuthModule, ViewModule]
})
export class ComponentsModule {}
