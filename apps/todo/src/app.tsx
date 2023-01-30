import { Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from './auth/protected-route.component';
import TodosPage from './pages/todos.page';

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 1
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/todos" />}
        />
        <Route
          path="/todos"
          element={<ProtectedRoute component={TodosPage} />}
        />
      </Routes>
    </QueryClientProvider>
  );
}
