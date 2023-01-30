import React from 'react';
import { Box, Navbar, ScrollArea } from '@mantine/core';
import { IconPlus } from '@tabler/icons';

import CreateTodoModal from '../create-todo-modal/create-todo-modal.component';
import { INavbarLink } from '../../ts';
import AppNavbarLink from './app-navbar-link.component';

export default function AppNavbar() {
  const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);

  const handleModalOpen = (): void => {
    setIsModalOpened(true);
  };

  const handleModalClose = (): void => {
    setIsModalOpened(false);
  };

  const navLinks: INavbarLink[] = React.useMemo(() => {
    return [
      {
        icon: IconPlus,
        label: 'Create',
        color: 'green',
        onClick: handleModalOpen
      }
    ];
  }, []);

  return (
    <>
      <Navbar
        width={{ base: 220 }}
        p="xs"
        hiddenBreakpoint="sm"
      >
        <Navbar.Section
          grow
          component={ScrollArea}
          mx="-xs"
          px="xs"
        >
          <Box py="md">
            {navLinks.map((link, idx) => (
              <AppNavbarLink
                key={idx}
                {...link}
              />
            ))}
          </Box>
        </Navbar.Section>
      </Navbar>
      <CreateTodoModal
        opened={isModalOpened}
        handleClose={handleModalClose}
      />
    </>
  );
}
