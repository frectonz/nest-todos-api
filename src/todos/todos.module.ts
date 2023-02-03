import { Module } from '@nestjs/common';

import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
