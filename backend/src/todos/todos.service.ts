import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(title: string, userId: number) {
    return this.prisma.todo.create({
      data: {
        title: title,
        userId: userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId: userId },
    });
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  updateCompleted(id: number, completed: boolean) {
    return this.prisma.todo.update({
      where: { id },
      data: {
        completed,
      },
    });
  }

  update(id: number, title: string) {
    return this.prisma.todo.update({
      where: { id },
      data: {
        title: title,
      },
    });
  }
}
