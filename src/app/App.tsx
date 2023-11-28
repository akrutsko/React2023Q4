import { RouterProvider } from 'react-router-dom';
import { router } from '../router/router';
import StoreProvider from '../store/StoreProvider';

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}
