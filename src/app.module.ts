import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma/prisma.service';

import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, TodosModule, PrismaModule],
  providers: [PrismaService, UsersService],
})
export class AppModule {}
