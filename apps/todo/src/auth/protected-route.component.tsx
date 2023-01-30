import { withAuthenticationRequired } from '@auth0/auth0-react';
import PageLoader from '../components/page-loader.component';
import RootLayout from '../layouts/root.layout';

interface IProps {
  component: React.ComponentType<object>;
}

export default function ProtectedRoute({ component }: IProps) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLoader />
  });

  return (
    <RootLayout>
      <Component />
    </RootLayout>
  );
}
