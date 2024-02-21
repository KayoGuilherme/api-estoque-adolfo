import { Module } from "@nestjs/common";
import { CategoryItemService } from "./category.service";
import { PrismaClient } from "@prisma/client";
import { CategoryItemController } from "./category.controller";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";




@Module({
    imports: [UsersModule, AuthModule],
    providers: [CategoryItemService, PrismaClient],
    controllers: [CategoryItemController]
})



export class CategoryItemModule {}