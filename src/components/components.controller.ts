import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { ComponentItemService } from './components.service';
import { CreateComponentDTO } from './dto/create-components.dto';
import { UpdateComponentDto } from './dto/update-components.dto';
import { Paramid } from 'src/decorators/param-id.decorator';

@ApiTags('Controle de Componentes')
@Controller('Componentes')
export class CategoryItemController {
  constructor(private readonly componentService: ComponentItemService) {}

  @Get()
  async getCategory() {
    return this.componentService.getComponent();
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Post()
  async saveCategory(@Body() data: CreateComponentDTO) {
    return this.componentService.createCompany(data);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Put(':id')
  async updateCategory(@Body() {nome_componente}: UpdateComponentDto, @Paramid() id) {
    return this.componentService.update({nome_componente}, id);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Delete(':id')
  async deleteCategory(@Paramid() id) {
    return this.componentService.delete(id);
  }
}
