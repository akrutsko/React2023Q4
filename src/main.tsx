import './index.css';

import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './components/App/App.tsx';
import NotFound from './components/NotFound/NotFound.tsx';
import ResultDetails from './components/Results/ResultDetails/ResultDetails.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=":id"
        element={<ResultDetails />}
        errorElement={<NotFound />}
      />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
