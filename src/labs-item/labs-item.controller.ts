import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';

import { UpdateLabsDto } from './dto/update-components-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { LabService } from './labs-item.service';
import { LabsDto } from './dto/create-components-category.dto';
import { Paramid } from 'src/decorators/param-id.decorator';

@ApiTags('Controle de laboratorios')
@Controller('labs-item')
export class ComponentsCategoryController {
  constructor(private readonly labService: LabService) {}

  @Post('create')
  create(@Body() data: LabsDto) {
    return this.labService.createLab(data);
  }

  @Get()
  findAll() {
    return this.labService.getLab();
  }

  @Get(':id')
  findOne(@Paramid() id: number) {
    return this.labService.getLabById(id);
  }

  @Put(':id')
  update(@Paramid() id: number, @Body() { nome_lab }: UpdateLabsDto) {
    return this.labService.update({ nome_lab }, id);
  }

  @Delete(':id')
  remove(@Paramid() id: number) {
    return this.labService.delete(id);
  }
}
