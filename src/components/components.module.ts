import { Module } from '@nestjs/common';
import { ComponentItemService } from './components.service';
import { PrismaClient } from '@prisma/client';
import { CategoryItemController } from './components.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [ComponentItemService, PrismaClient],
  controllers: [CategoryItemController],
})
export class CategoryItemModule {}
