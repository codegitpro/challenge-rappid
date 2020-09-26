import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../endpoints/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  //
  async createToken(user) {
    const expiresIn = 60 * 60 * 5;
    const secretOrKey = 'youllneverguess';
    const token = jwt.sign({ email: user.email }, secretOrKey, { expiresIn });

    return {
      expires_in: expiresIn,
      token,
    }
  }

  async validateUser(signedUser, req): Promise<boolean> {
    if (signedUser && signedUser.email) {
      const user = await this.usersService.findByEmail(signedUser.email);
      if (user) {
        req.authUser = user;
        return true;
      }
    }

    return false;
  }
}