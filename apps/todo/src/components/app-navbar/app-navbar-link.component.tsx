import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { INavbarLink } from '../../ts';

export default function AppNavbarLink({ icon: Icon, label, color, onClick }: INavbarLink) {
  return (
    <UnstyledButton
      onClick={onClick}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        ':hover': {
          backgroundColor: theme.colors.gray[0]
        }
      })}
    >
      <Group>
        <ThemeIcon
          variant="light"
          {...(color ? { color } : {})}
        >
          {<Icon size={16} />}
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
