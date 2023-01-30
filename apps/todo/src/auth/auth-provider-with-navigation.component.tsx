import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { environment } from '../../environments/environment';

interface IProps {
  children: React.ReactNode;
}

export default function AuthProviderWithNavigation({ children }: IProps) {
  const navigate = useNavigate();

  const {
    auth0: { clientId, domain, redirectUrl }
  } = environment;

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUrl,
        audience: 'http://api-todo-app.com'
      }}
      useRefreshTokens
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
