import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PrismaService } from './users/prisma.service';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [PrismaService, UsersService],
})
export class AppModule {}
