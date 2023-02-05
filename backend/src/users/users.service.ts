import { hash } from 'bcrypt';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.user.deleteMany();
  }

  async createUser(username: string, password: string) {
    const hashedPassword = await hash(password, SALT_ROUNDS);
    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  }

  async getUser(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
