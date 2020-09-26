import {
  Get,
  Put,
  Post,
  Delete,
  Controller,
  Body,
  Bind,
  Param,
  Req,
  Res,
  HttpStatus
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Req() req): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('me')
  async findMe(@Req() req): Promise<User> {
    return await this.usersService.findOne(req.authUser.id);
  }

  @Post('exists')
  async findByEmail(@Req() req, @Body() body): Promise<{exists: boolean}> {
    if (!body || !body.email) return { exists: false };
    let user = await this.usersService.findByEmail(body.email);
    if (user) return { exists: true }
    else return { exists: false };
  }

  @Post()
  async create(@Body() body: any) {
    return await this.usersService.create(body);

  }

  @Put(':id')
  @Bind(Param('id'))
  async update(id: number, @Body() body: any): Promise<User> {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  @Bind(Param('id'))
  async delete(id) {
    await this.usersService.delete(id);
  }
}
