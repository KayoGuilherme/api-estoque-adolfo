import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';

import { UpdateComponentsCategoryDto } from './dto/update-components-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { ComponentItemService } from './components-category.service';
import { ComponentsCategoryDto } from './dto/create-components-category.dto';


@ApiTags('Controle de Componentes')
@Controller('components')
export class ComponentsCategoryController {
  constructor(
    private readonly componentsCategoryService: ComponentItemService,
  ) {}

  @Post('create')
  create(@Body() data: ComponentsCategoryDto) {
    return this.componentsCategoryService.createCategory(data);
  }

  @Get()
  findAll() {
    return this.componentsCategoryService.getCategory();
  }

  @Get(':id_component')
  findOne(@Param('id_component') id_component: number) {
    return this.componentsCategoryService.getCategoryById(id_component);
  }

  @Put(':id_component')
  update(
    @Param('id_component') id_component: number,
    @Body() data: UpdateComponentsCategoryDto,
  ) {
    return this.componentsCategoryService.update(data, id_component);
  }

  @Delete(':id_component')
  remove(@Param('id_component') id_component: number) {
    return this.componentsCategoryService.delete(id_component);
  }
}
