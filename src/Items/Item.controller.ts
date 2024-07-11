import { Body, Controller, Delete, Get, Param, Post, Put,  UseGuards } from "@nestjs/common";
import { Paramid } from "src/decorators/param-id.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { ItemService } from './Item.service';
import { ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "../guards/role.guard";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enums/role.enum";
import { CreateItemDto } from "./dto/create-Item.dto";
import { UpdateItemDto } from "./dto/update-Item.dto";


@UseGuards(AuthGuard)
@Controller('Item')
@ApiTags('Controle de Items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getProduct() {
    return this.itemService.get();
  }

  @Get(':id')
  async getProductById(@Paramid() id) {
    return this.itemService.getById(id);
  }

  @Get('lab/:lab_id')
  async getItemLab(@Param('lab_id') lab_id: number) {
    return this.itemService.getItemByLab(lab_id)
  }

  @UseGuards(RoleGuard)
  @Roles(Role.Professor)
  @Post('create')
  async createProduct(@Body() data: CreateItemDto) {
    return this.itemService.create(data);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.Professor)
  @Put(':id')
  async updateProduct(@Body() data: UpdateItemDto, @Paramid() id) {
    return this.itemService.update(id, data);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.Professor)
  @Delete(':id')
  async deleteProduct(@Paramid() id_produto) {
    return this.itemService.delete(id_produto);
  }
}