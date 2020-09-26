import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Get,
  Body,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../endpoints/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async getToken(@Response() res: any, @Body() body) {
    if (!(body && body.email && body.password)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
    }

    const user = await this.usersService.findByEmail(body.email);
    if (user) {
      if (await this.usersService.compareHash(body.password, user.password)) {
        return res.status(HttpStatus.OK).json(
          await this.authService.createToken(user),
        );
      }
    }

    return res.status(HttpStatus.FORBIDDEN).json({
      message: 'Incorrect email or password!',
    });
  }

  @Get('authorized')
  public async authorized() {
    console.log('Authorized route...');
  }
}