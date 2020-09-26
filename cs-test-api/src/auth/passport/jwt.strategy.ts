import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token')]),
        passReqToCallback: true,
        secretOrKey: 'youllneverguess',
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    passport.use(<any>this);
  }

  public async verify(req, payload, done) {
    const isValid = await this.authService.validateUser(payload, req);
    if (!isValid) {
      return done('Unauthorized', false);
    }
    done(null, payload);
  }
}