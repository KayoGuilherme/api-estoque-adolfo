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
import { ComponentItemService } from './components.service';
import { CreateComponentDTO } from './dto/create-components.dto';
import { UpdateComponentDto } from './dto/update-components.dto';
import { Paramid } from 'src/decorators/param-id.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Controle de Componentes')
@Controller('Componentes')
export class CategoryItemController {
  constructor(private readonly componentService: ComponentItemService) {}

  @Get()
  async getCategory() {
    return this.componentService.getComponent();
  }

  @Post()
  async saveCategory(@Body() data: CreateComponentDTO) {
    return this.componentService.createCompany(data);
  }

  @Put(':id')
  async updateCategory(
    @Body() { nome_componente }: UpdateComponentDto,
    @Paramid() id,
  ) {
    return this.componentService.update({ nome_componente }, id);
  }

  @Delete(':id')
  async deleteCategory(@Paramid() id) {
    return this.componentService.delete(id);
  }
}
