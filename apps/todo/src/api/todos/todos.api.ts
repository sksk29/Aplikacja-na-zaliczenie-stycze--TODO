import { ICreateTodo, IPage, IPageOptions, ITodo, IUpdateTodo } from '@todo-app/shared/data-access';
import DeleteTodoModal from '../../components/delete-todo-modal/delete-todo-modal.component';
import { BaseApi } from '../base.api';

class TodosApiStatic extends BaseApi {
  private static instance: TodosApiStatic;

  public static getInstance(): TodosApiStatic {
    if (!TodosApiStatic.instance) {
      TodosApiStatic.instance = new TodosApiStatic();
    }
    return TodosApiStatic.instance;
  }

  public async getTodos(
    accessToken: string,
    pageOptions: Partial<IPageOptions> = {}
  ): Promise<IPage<ITodo>> {
    const searchParams = new URLSearchParams();

    Object.entries(pageOptions).forEach(([key, value]) => {
      searchParams.append(key, value.toString());
    });

    const url = `todos?${searchParams.toString()}`;

    const { data } = await this.httpClient.get<IPage<ITodo>>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return data;
  }

  public async createTodo(accessToken: string, data: ICreateTodo): Promise<{ status: 'ok' }> {
    const { data: responseData } = await this.httpClient.post<{
      status: 'ok';
    }>('todos/create', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return responseData;
  }

  public async updateTodo(accessToken: string, todoId: string, data: IUpdateTodo) {
    const { data: responseData } = await this.httpClient.patch<{
      status: 'ok';
    }>(`todos/${todoId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return responseData;
  }

  public async deleteTodo(accessToken: string, todoId: string): Promise<{ status: 'ok' }> {
    const { data } = await this.httpClient.delete<{ status: 'ok' }>(`todos/${todoId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return data;
  }
}

export const TodosApi = TodosApiStatic.getInstance();
