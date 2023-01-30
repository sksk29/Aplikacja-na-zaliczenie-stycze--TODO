import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICreateTodo } from '@todo-app/shared/data-access';
import { TodosApi } from '../../api/todos';

interface IProps {
  opened: boolean;
  handleClose: () => void;
}

interface IFormValues {
  title: string;
  description: string;
}

export default function CreateTodoModal({ opened, handleClose }: IProps) {
  const { getAccessTokenSilently } = useAuth0();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (createTodo: ICreateTodo) => {
      const token = await getAccessTokenSilently();
      return TodosApi.createTodo(token, createTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      handleClose();
    }
  });

  const form = useForm<IFormValues>({
    initialValues: {
      title: '',
      description: ''
    },
    validateInputOnBlur: true,
    validate: {
      description: (val) => (val.match(/^[a-zA-Z ]{3,}$/) ? null : 'Invalid description'),
      title: (val) => (val.match(/^[a-zA-Z ]{3,}$/) ? null : 'Invalid title')
    }
  });

  const handleSubmit = form.onSubmit(({ title, description }) => {
    mutate({
      title,
      description
    });
  });

  return (
    <Modal
      opened={opened}
      onClose={() => handleClose()}
      withCloseButton
      centered
      size="md"
      title="Create a new todo"
    >
      <Box
        sx={{ maxWidth: 400 }}
        mx="auto"
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Title"
            required
            {...form.getInputProps('title')}
          />
          <TextInput
            mt="md"
            withAsterisk
            label="Description"
            placeholder="Description"
            required
            {...form.getInputProps('description')}
          />
          <Button
            disabled={isLoading}
            loading={isLoading}
            loaderProps={{
              color: 'blue'
            }}
            mt="md"
            type="submit"
            fullWidth
          >
            Create
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
