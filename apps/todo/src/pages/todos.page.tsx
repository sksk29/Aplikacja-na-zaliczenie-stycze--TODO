import { Container, Grid, LoadingOverlay } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import { IPageOptions } from '@todo-app/shared/data-access';

import Todo from '../components/todo.component';
import { TodosApi } from '../api/todos';

export default function TodosPage() {
  const { getAccessTokenSilently } = useAuth0();

  const { data, isLoading } = useQuery(['todos'], {
    queryFn: async ({ pageParam }: QueryFunctionContext<string[], IPageOptions>) => {
      const accessToken = await getAccessTokenSilently();
      return TodosApi.getTodos(accessToken, pageParam);
    }
  });

  return (
    <Container fluid>
      <Grid
        gutter="lg"
        gutterXs="md"
      >
        {isLoading ? (
          <LoadingOverlay visible />
        ) : (
          data?.data.map((todo) => (
            <Grid.Col
              key={todo.id}
              span={3}
            >
              <Todo {...todo} />
            </Grid.Col>
          ))
        )}
      </Grid>
    </Container>
  );
}
