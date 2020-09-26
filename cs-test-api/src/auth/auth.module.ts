import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../endpoints/users/users.module';

@Module({
  providers: [
    AuthService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  imports: [UsersModule],
})

// export class AuthModule {}
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(
        { path: '/prescriptions*', method: RequestMethod.GET },
        { path: '/prescriptions*', method: RequestMethod.POST },
        { path: '/prescriptions*', method: RequestMethod.PUT },
        { path: '/prescriptions*', method: RequestMethod.DELETE },

        { path: '/users*', method: RequestMethod.GET },
        { path: '/users*', method: RequestMethod.PUT },
        { path: '/users*', method: RequestMethod.DELETE },
      );
  }
}