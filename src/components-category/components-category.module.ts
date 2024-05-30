import { Module } from '@nestjs/common';

import { ComponentsCategoryController } from './components-category.controller';
import { ComponentItemService } from './components-category.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ComponentsCategoryController],
  providers: [ComponentItemService],
})
export class ComponentsCategoryModule {}
