import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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
    console.log(req.user);
    return this.todosService.create(title, req.user.userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req) {
    return this.todosService.findAll(req.user.userId);
  }
}
