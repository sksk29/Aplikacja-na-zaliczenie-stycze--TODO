import { useAuth0 } from '@auth0/auth0-react';
import { ActionIcon, Group, Header as MantineHeader, Menu, Text } from '@mantine/core';
import { IconLogout, IconSettings } from '@tabler/icons';

export default function Header() {
  const { logout, user } = useAuth0();

  return (
    <MantineHeader height={60}>
      <Group
        sx={{ height: '100%' }}
        px={20}
        position="apart"
      >
        <Text weight={700}>Todo App</Text>
        <Menu
          shadow="md"
          width={200}
        >
          <Menu.Target>
            <ActionIcon>
              <IconSettings size={20} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            {user ? <Menu.Label>{user.name}</Menu.Label> : null}
            <Menu.Item
              onClick={() => {
                logout({
                  logoutParams: {
                    returnTo: window.location.origin
                  }
                });
              }}
              icon={<IconLogout size={14} />}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </MantineHeader>
  );
}
