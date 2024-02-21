import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryItemService } from './category.service';
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Paramid } from "../decorators/param-id.decorator";
import { RoleGuard } from "../guards/role.guard";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enums/role.enum";
import { AuthGuard } from "../guards/auth.guard";



@ApiTags('Controle de Categorias')
@Controller('Category')
export class CategoryItemController {

    constructor(private readonly categoryProduct: CategoryItemService) { }


    @Get()
    async getCategory() {
        return this.categoryProduct.getCategory()
    }

    @UseGuards(AuthGuard)
    @Roles(Role.Professor)
    @Post()
    async saveCategory(@Body() data: CreateCategoryDTO,) {
        return this.categoryProduct.createCategory(data)
    }

    @UseGuards(AuthGuard)
    @Roles(Role.Professor)
    @Put(':id')
    async updateCategory(@Body() data: UpdateCategoryDto, @Paramid() id) {
        return this.categoryProduct.update(data, id)
    }

    @UseGuards(AuthGuard)
    @Roles(Role.Professor)
    @Delete(':id')
    async deleteCategory(@Paramid() id) {
        return this.categoryProduct.delete(id)
    }

}