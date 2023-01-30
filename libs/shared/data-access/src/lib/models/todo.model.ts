export interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTodo {
  readonly title: string;
  readonly description: string;
}

export interface IUpdateTodo {
  readonly title?: string;
  readonly description?: string;
  readonly completed?: boolean;
}
