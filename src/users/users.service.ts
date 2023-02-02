import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma.service';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
