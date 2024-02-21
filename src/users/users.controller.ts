import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/role.decorator';
import { Paramid } from '../decorators/param-id.decorator';
import { ApiTags } from '@nestjs/swagger';


@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
@ApiTags('Controle de Usuarios')
export class UsersController {

    constructor(private readonly UserService: UsersService) {}

    @Roles(Role.admin)
    @Get()
    async get() {
        return this.UserService.read()
    }

    @Roles(Role.admin)
    @Get(":id")
    async getbyId(@Paramid() id) {
        return this.UserService.readById(id)
    }

    @Roles(Role.admin)
    @Post()
    async create(@Body() data: CreateUserDTO) {
         return this.UserService.create(data)
    }
    @Roles(Role.admin)
    @Put(":id")
    async update(@Body() data: UpdateUserDto, @Paramid() id) {
        return this.UserService.update(id, data)
    }

    @Roles(Role.admin)
    @Delete(":id")
    async delete(@Paramid() id) {
        return this.UserService.delete(id)
    }
}
