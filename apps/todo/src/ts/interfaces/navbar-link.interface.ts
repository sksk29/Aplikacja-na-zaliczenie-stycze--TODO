import { DefaultMantineColor } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

export interface INavbarLink {
  icon: TablerIcon;
  label: string;
  color?: DefaultMantineColor;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
