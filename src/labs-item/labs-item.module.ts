import { Module } from '@nestjs/common';

import { ComponentsCategoryController } from './labs-item.controller';
import { LabService } from './labs-item.service';
import { PrismaModule } from 'src/database/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [ComponentsCategoryController],
  providers: [LabService],
})
export class ComponentsCategoryModule {}
