import { AppShell } from '@mantine/core';
import AppNavbar from '../components/app-navbar/app-navbar.component';
import Header from '../components/header.component';

interface IProps {
  children?: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={<Header />}
      navbar={<AppNavbar />}
    >
      {children}
    </AppShell>
  );
}
