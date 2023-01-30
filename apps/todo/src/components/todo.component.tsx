import React from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  LoadingOverlay,
  Text,
  Tooltip
} from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IconTrash } from '@tabler/icons';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { ITodo } from '@todo-app/shared/data-access';
import { DateTime } from 'luxon';
import { TodosApi } from '../api/todos';
import DeleteTodoModal from './delete-todo-modal/delete-todo-modal.component';

export default function Todo({ completed, description, title, createdAt, id }: ITodo) {
  const { getAccessTokenSilently } = useAuth0();

  const queryClient = useQueryClient();

  const [isRemoveTodoModalOpened, setIsRemoveTodoModalOpened] = React.useState<boolean>(false);

  const handleRemoveTodoModalClose = () => {
    setIsRemoveTodoModalOpened(false);
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      const token = await getAccessTokenSilently();
      return TodosApi.updateTodo(token, id, {
        completed: true
      });
    }
  });

  const handleTodoComplete = async () => {
    await mutateAsync();
    queryClient.invalidateQueries(['todos']);
  };

  return (
    <>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        component={motion.div}
        whileHover={{
          scale: 1.05
        }}
        layout
        sx={{
          minWidth: 300
        }}
      >
        <LoadingOverlay visible={isLoading} />
        <Card.Section></Card.Section>

        <Group
          position="apart"
          mt="md"
          mb="xs"
        >
          <Text weight={500}>{title}</Text>
          <Tooltip
            label="Delete Todo"
            position="right-start"
            withArrow
          >
            <ActionIcon
              color="red"
              onClick={() => {
                setIsRemoveTodoModalOpened(true);
              }}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>

        <Group
          position="apart"
          mt="sm"
        >
          <Text
            size="sm"
            color="dimmed"
          >
            Created at: {DateTime.fromISO(createdAt).toFormat('dd/MM/yyyy')}
          </Text>
          <Badge color={completed ? 'green' : 'red'}>{completed ? 'Completed' : 'Pending'}</Badge>
        </Group>

        <Text
          size="sm"
          color="dimmed"
          mt="sm"
        >
          {description}
        </Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          radius="md"
          mt="md"
          onClick={handleTodoComplete}
          disabled={completed}
          loading={isLoading}
        >
          Complete
        </Button>
      </Card>
      <DeleteTodoModal
        opened={isRemoveTodoModalOpened}
        handleClose={handleRemoveTodoModalClose}
        todoId={id}
      />
    </>
  );
}
