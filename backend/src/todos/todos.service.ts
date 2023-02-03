import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
      where: {
        userId: userId,
      },
    });
  }
}
