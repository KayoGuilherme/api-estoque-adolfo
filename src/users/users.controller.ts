import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Paramid } from '../decorators/param-id.decorator';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('users')
@ApiTags('Controle de Usuarios')
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Get()
  async get() {
    return this.UserService.read();
  }

  @Get(':id')
  async getbyId(@Paramid() id) {
    return this.UserService.readById(id);
  }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.UserService.create(data);
  }

  @Put(':id')
  async update(@Body() data: UpdateUserDto, @Paramid() id) {
    return this.UserService.update(id, data);
  }

  @Delete(':id')
  async delete(@Paramid() id) {
    return this.UserService.delete(id);
  }
}
