import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { PrismaModule } from "../database/prisma.module";
import { PrismaClient } from "@prisma/client";
import { ItemService } from "./Item.service";
import { ItemController } from "./Item.controller";






@Module({
    imports: [ AuthModule, forwardRef(() => UsersModule), PrismaModule],
    controllers: [ItemController],
    providers: [ItemService, PrismaClient],
    exports: [ItemService, ItemModule]
})

export class ItemModule {}