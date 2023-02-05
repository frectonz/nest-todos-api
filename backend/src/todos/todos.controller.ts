import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body('title') title: string, @Req() req) {
    return this.todosService.create(title, req.user.userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req) {
    return this.todosService.findAll(req.user.userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body('title') title: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      return await this.todosService.update(id, title);
    } catch (e) {
      throw new BadRequestException('Todo not found');
    }
  }

  @Patch(':id/toggle')
  @HttpCode(HttpStatus.OK)
  async toggle(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todosService.findOne(id);

    if (!todo) {
      throw new BadRequestException('Todo not found');
    }

    return this.todosService.updateCompleted(id, !todo.completed);
  }
}
