import { String, ValidationSchema } from '@nest-up/nest-fastest-validator';
import { ICreateTodo } from '@todo-app/shared/data-access';

@ValidationSchema()
export class CreateTodoDto implements ICreateTodo {
  @String({
    empty: false,
    trim: true,
    min: 1,
    max: 255
  })
  public readonly title: string;

  @String({
    empty: false,
    min: 1,
    max: 255,
    trim: true
  })
  public readonly description: string;
}
