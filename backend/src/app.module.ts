import { Module, OnModuleInit } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './prisma/prisma.module';

import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, UsersModule, TodosModule, PrismaModule],
})
export class AppModule implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.todo.deleteMany();
    await this.prisma.user.deleteMany();
  }
}
