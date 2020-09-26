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
} from '@nestjs/common';
import { Prescription } from './prescription.entity';
import { PrescriptionsService } from './prescriptions.service';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Get()
  async findAll(@Req() req): Promise<Prescription[]> {
    return await this.prescriptionsService.findAll(req.authUser);
  }

  @Get(':id')
  @Bind(Param('id'))
  async findOne(id): Promise<Prescription> {
    return await this.prescriptionsService.findOne(id);
  }

  @Post()
  async create(@Req() req, @Body() body: any) {
    body.userId = req.authUser.id;
    return await this.prescriptionsService.create(body);
  }

  @Put(':id')
  @Bind(Param('id'))
  async update(id: number, @Body() body: any): Promise<any> {
    return await this.prescriptionsService.update(id, body);
  }

  @Delete(':id')
  @Bind(Param('id'))
  async delete(id) {
    await this.prescriptionsService.delete(id);
  }
}
