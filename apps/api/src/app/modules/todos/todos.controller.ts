import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ITodo, IUpdateTodo } from '@todo-app/shared/data-access';

import { AuthenticatedUser } from '../../decorators';
import { PageDto, PageOptionsDto } from '../../dtos/pagination';
import { CreateTodoDto } from '../../dtos/todo.dto';
import { TUser } from '../../ts';
import { TodosService } from './todos.service';

@Controller('/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public getTodos(
    @AuthenticatedUser() user: TUser,
    @Query() pageOptions: PageOptionsDto
  ): Promise<PageDto<ITodo>> {
    return this.todosService.getUserTodos(user.user_id, pageOptions);
  }

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  public async createTodo(
    @AuthenticatedUser() user: TUser,
    @Body() createTodoDto: CreateTodoDto
  ): Promise<{
    status: 'ok';
  }> {
    return this.todosService.createTodo(user.user_id, createTodoDto);
  }

  @Patch('/:todoId')
  @UseGuards(AuthGuard('jwt'))
  public async updateTodo(
    @Param('todoId')
    todoId: string,
    @Body() updateTodoData: IUpdateTodo
  ): Promise<{
    status: 'ok';
  }> {
    return this.todosService.updateTodoById(todoId, updateTodoData);
  }

  @Delete('/:todoId')
  @UseGuards(AuthGuard('jwt'))
  public async deleteTodo(@Param('todoId') todoId: string): Promise<{
    status: 'ok';
  }> {
    return this.todosService.deleteTodoById(todoId);
  }
}
