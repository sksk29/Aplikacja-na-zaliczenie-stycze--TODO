import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Modal, Text } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodosApi } from '../../api/todos';

interface IProps {
  opened: boolean;
  handleClose: () => void;
  todoId: string;
}

export default function DeleteTodoModal({ opened, handleClose, todoId }: IProps) {
  const { getAccessTokenSilently } = useAuth0();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      const token = await getAccessTokenSilently();
      return TodosApi.deleteTodo(token, todoId);
    }
  });

  const handleDelete = async () => {
    await mutateAsync();
    handleClose();
    queryClient.invalidateQueries(['todos']);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        handleClose();
      }}
      withCloseButton
      centered
      size="md"
      title="Delete todo"
    >
      <Box sx={{ minWidth: 300, padding: '1rem' }}>
        <Text
          size="lg"
          weight={500}
        >
          Are you sure you want to delete this todo?
        </Text>

        <Button.Group
          sx={{ width: '100%' }}
          mt="xl"
        >
          <Button
            fullWidth
            color="blue"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            color="red"
            onClick={handleDelete}
            loading={isLoading}
          >
            Delete
          </Button>
        </Button.Group>
      </Box>
    </Modal>
  );
}
