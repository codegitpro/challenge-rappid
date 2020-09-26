import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrescriptionsModule } from './endpoints/prescriptions/prescriptions.module';
import { UsersModule } from './endpoints/users/users.module';

@Module({
  imports: [
    AuthModule,
    PrescriptionsModule,
    UsersModule,
  ],
  controllers: [
    AppController,
  ],
})
export class ApplicationModule {
  //
}