import { Module } from '@nestjs/common';

import { ComponentsCategoryController } from './labs-item.controller';
import { LabService } from './labs-item.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ComponentsCategoryController],
  providers: [LabService],
})
export class ComponentsCategoryModule {}
