import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { ITodo, IUpdateTodo } from '@todo-app/shared/data-access';
import { DateTime } from 'luxon';

import { PrismaService } from '../../../prisma';
import { PageDto, PageMetadataDto, PageOptionsDto } from '../../dtos/pagination';
import { CreateTodoDto } from '../../dtos/todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserTodos(userId: string, pageOptions: PageOptionsDto): Promise<PageDto<ITodo>> {
    const { limit, skip, order, orderBy } = pageOptions;

    const [todos, count] = await Promise.all([
      this.prisma.todo.findMany({
        where: {
          userId
        },
        skip,
        orderBy: {
          [orderBy]: order
        },
        take: limit
      }),
      this.prisma.todo.count({
        where: {
          userId
        }
      })
    ]);

    const meta = new PageMetadataDto({
      pageOptions,
      itemCount: count
    });

    return new PageDto<ITodo>(todos.map(this.todoToResponseTodo), meta);
  }

  public async createTodo(
    userId: string,
    dto: CreateTodoDto
  ): Promise<{
    status: 'ok';
  }> {
    await this.prisma.todo.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description
      }
    });

    return {
      status: 'ok'
    };
  }

  public async updateTodoById(
    todoId: string,
    dto: IUpdateTodo
  ): Promise<{
    status: 'ok';
  }> {
    await this.prisma.todo.update({
      where: {
        id: todoId
      },
      data: dto
    });

    return {
      status: 'ok'
    };
  }

  public async deleteTodoById(todoId: string): Promise<{
    status: 'ok';
  }> {
    await this.prisma.todo.delete({
      where: {
        id: todoId
      }
    });

    return {
      status: 'ok'
    };
  }

  private todoToResponseTodo(todo: Todo): ITodo {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: DateTime.fromJSDate(todo.createdAt).toISO(),
      updatedAt: DateTime.fromJSDate(todo.updatedAt).toISO()
    };
  }
}
